const Database = require('../database/my-database');
const { hash, compare } = require('bcryptjs');
const { verify } = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const { createAccessToken,
   createRefreshToken,
   sendAccessToken,
   sendRefreshToken } = require('./tokens.js');
const Emails_Collection = process.env.EMAILS_COLLECTION;

//handle register client request
const handleRegisteration = async (email, password) => {
   const user = await Database.findOne(Emails_Collection, { email: email });
   if (user) throw new Error('User already exists!');
   const hashPassword = await hash(password, 10);
   await Database.insertOne(Emails_Collection, {
      email: email,
      password: hashPassword
   })
   return true;
}

//handle login client request
const handleLogin = async (req, res, email, password) => {
   const user = await Database.findOne(Emails_Collection, { email: email });
   if (!user) throw new Error('User does not exist!');
   const valid = await compare(password, user.password);
   if (!valid) throw new Error('Password is incorrect!');
   const accesstoken = createAccessToken(user.email);
   const refreshtoken = createRefreshToken(user.email);
   sendRefreshToken(res, refreshtoken);
   sendAccessToken(req, res, accesstoken);
   Database.updateOne(Emails_Collection,{email: user.email},{refreshtoken: refreshtoken});
   return true;
}

//refresh access token 
const refreshAccessToken = async (req, res) => {
   const token = req.cookies.refreshtoken;
   console.log(token);
   if (!token) return res.send({ accesstoken: '' });
   let payload = null;
   try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
      console.log( "payload " + payload.userId);
   } catch (err) {
      return res.send({ accesstoken: '' });
   }
   const user = await Database.findOne(Emails_Collection, { email: payload.userId });
   console.log(user);
   if (!user || user.refreshtoken !== token) return res.send({ accesstoken: '' });
   const accesstoken = createAccessToken(user.email);
   const refreshtoken = createRefreshToken(user.email);
   sendRefreshToken(res, refreshtoken);
   Database.updateOne(Emails_Collection,{email: user.email},{refreshtoken: refreshtoken});
   return res.send({ accesstoken });
}


module.exports = { handleRegisteration, handleLogin, refreshAccessToken }
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
   Database.updateOne(Emails_Collection, { email: user.email }, { refreshtoken: refreshtoken });
   return true;
}

//refresh access token 
const refreshAccessToken = async (req, res) => {
   const token = req.cookies.refreshtoken;
   if (!token) {
      return res.send({ accesstoken: '' });
   }
   let payload = null;
   try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
   } catch (err) {
      return res.send({ accesstoken: '' });
   }
   const user = await Database.findOne(Emails_Collection, { email: payload.userId });

   if (!user || user.refreshtoken !== token) {
      return res.send({ accesstoken: '' });
   }
   const accesstoken = createAccessToken(user.email);
   const refreshtoken = createRefreshToken(user.email);
   sendRefreshToken(res, refreshtoken);
   Database.updateOne(Emails_Collection, { email: user.email }, { refreshtoken: refreshtoken });
   return res.send({ accessToken: accesstoken });
}

const getAllFood = async (res) => {
   try {
      const result = await Database.find('food', {},  {_id: 0 });
      console.log(result);
      return res.send(result);
   } catch (err) {
      throw Error('something went wrong fetching food data');
   }

}

module.exports = { handleRegisteration, handleLogin, refreshAccessToken, getAllFood }
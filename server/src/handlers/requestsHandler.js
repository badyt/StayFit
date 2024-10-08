const Database = require('../database/my-database');
const { hash, compare } = require('bcryptjs');
const { verify } = require('jsonwebtoken');
const {Emails_Collection} = require('../globals.js')
const { createAccessToken,
   createRefreshToken,
   sendAccessToken,
   sendRefreshToken } = require('./tokens.js');
const { ObjectId } = require('mongodb');

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
   const accesstoken = createAccessToken(user._id);
   const refreshtoken = createRefreshToken(user._id);
   sendRefreshToken(res, refreshtoken);
   sendAccessToken(req, res, accesstoken);
   Database.updateOne(Emails_Collection, { _id: user._id }, { refreshtoken: refreshtoken });
   return true;
}

//refresh access token 
const refreshAccessToken = async (req, res) => {
   const token = req.cookies.refreshtoken;
   if (!token) {
      return res.send({ accessToken: '' });
   }
   let payload = null;
   try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
   } catch (err) {
      return res.send({ accessToken: '' });
   }
   const userId = ObjectId.createFromHexString(payload.userId);
   const user = await Database.findOne(Emails_Collection, { _id: userId });
   if (!user || user.refreshtoken !== token) {
      return res.send({ accessToken: '' });
   }
   const accesstoken = createAccessToken(user._id);
   const refreshtoken = createRefreshToken(user._id);
   sendRefreshToken(res, refreshtoken);
   Database.updateOne(Emails_Collection, { _id: user._id }, { refreshtoken: refreshtoken });
   return res.send({ accessToken: accesstoken });
}

const getAllDataInCollection = async (res, collectionName) => {
   try {
      const result = await Database.find(collectionName, {}, { _id: 0 });
      return res.send(result);
   } catch (err) {
      throw Error(`something went wrong fetching ${collectionName} data`);
   }
}



module.exports = { handleRegisteration, handleLogin, refreshAccessToken, getAllDataInCollection }
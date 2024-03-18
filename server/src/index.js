require('dotenv/config');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const Database = require('./database/my-database');
const requestHandler = require('./handlers/requestsHandler');
const { isAuth } = require('./handlers/isAuth');

const server = express();

server.use(cookieParser());
server.use(cors({ 
    origin: 'http://localhost:5173',
    credentials: true }));

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//Initialize server and database connections
const Initialize = async () => {
    try {
        server.listen(process.env.PORT, () => {
            console.log(`Server is listening on port ${process.env.PORT}`);
        });
        await Database.connect();
    }
    catch (error) {
        console.error('Error:', error);
    }
}

//Register a user
server.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        await requestHandler.handleRegisteration(email, password);
        res.send('User Created Successfully');
    } catch (error) {
        res.send({ error: error.message });
    }
})

//Login a user
server.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        await requestHandler.handleLogin(req, res, email, password);
    } catch (error) {
        res.send({ error: error.message });
    }
})

//Logout user
server.post('/logout', async (req, res) => {
    res.clearCookie('refreshtoken', { path: '/refresh_token' });
    return res.send({
        message: 'Logged out'
    })
});

//Protected route
server.post('/protected', async (req, res) => {
    try {
        const userId = isAuth(req);
        if (userId !== null) {
            res.send({ data: 'this data is protected' })
        }
    } catch (err) {
        res.send({ error: `${err.message}` })
    }
})

//get a new access token using a refresh token
server.post('/refresh_token', async (req, res) => {
    try {
        await requestHandler.refreshAccessToken(req, res);
    } catch (error) {
        res.send({ error: error.message });
    }
})

Initialize();

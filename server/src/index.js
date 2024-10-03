require('dotenv/config');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const Database = require('./database/my-database');
const requestHandler = require('./handlers/requestsHandler');
const routineHandler = require('./handlers/routineHandler');
const dietHandler = require('./handlers/dietHandler');
const { isAuth } = require('./handlers/isAuth');
const { Food_Collection, Exercises_Collection } = require('./globals')
const server = express();

server.use(cookieParser());
server.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

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
        res.send({ message: 'User Created' });
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

server.get('/getAllFood', async (req, res) => {
    try {
        await requestHandler.getAllDataInCollection(res, Food_Collection);
    } catch (error) {
        res.send({ error: error.message });
    }
})

server.get('/getAllExercises', async (req, res) => {
    try {
        await requestHandler.getAllDataInCollection(res, Exercises_Collection);
    } catch (error) {
        res.send({ error: error.message });
    }
})

server.post('/addExerciseToRoutine', async (req, res) => {
    try {
        let didSucceed = await routineHandler.addExerciseToRoutine(req)
        res.send(didSucceed)
    } catch (error) {
        res.send({ error: error.message });
    }
})

server.post('/removeExerciseFromRoutine', async (req, res) => {
    try {
        let didSucceed = await routineHandler.removeExerciseFromRoutine(req)
        res.send(didSucceed)
    } catch (error) {
        res.send({ error: error.message });
    }
})

server.get('/getUserRoutine', async (req, res) => {
    try {
        const userId = req.query.userId; 
        let routine = await routineHandler.getUserRoutine(userId);
        res.send({ data: routine })
    } catch (error) {
        res.send({ error: error.message })
    }
})

server.get('/getUserDiet', async (req, res) => {
    try {
        const userId = req.query.userId; 
        let routine = await dietHandler.getUserDiet(userId);
        res.send({ data: routine })
    } catch (error) {
        res.send({ error: error.message })
    }
})

server.post('/addMealToDiet', async (req, res) => {
    try {
        let didSucceed = await dietHandler.addMealToDiet(req)
        res.send(didSucceed)
    } catch (error) {
        res.send({ error: error.message });
    }
})

server.post('/removeMealFromDiet', async (req, res) => {
    try {
        let didSucceed = await dietHandler.removeMealFromDiet(req)
        res.send(didSucceed)
    } catch (error) {
        res.send({ error: error.message });
    }
})

Initialize();

const { sign } = require('jsonwebtoken');

//create access token
const createAccessToken = (userId) => {
    return sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m'
    })
};

//create refresh token
const createRefreshToken = (userId) => {
    return sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d'
    })
};

//send access token to client
const sendAccessToken = (req, res, accesstoken) => {
    res.send({
        accesstoken,
        email: req.body.email
    })
}

//send refresh token to client
const sendRefreshToken = (res, refreshtoken) => {
    res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
        path: '/refresh_token'
    })
}

module.exports = {
    createAccessToken,
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken
}
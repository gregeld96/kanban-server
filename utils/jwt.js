require('dotenv').config();

const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;

function generateToken (payload){
    return jwt.sign(payload, JWT_KEY);
}

function verifyToken (token){
    return jwt.verify(token, JWT_KEY);
}


module.exports = {
    generateToken, 
    verifyToken,
};
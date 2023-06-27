require('dotenv').config();

const bcrypt = require('bcryptjs');
const SALT_KEY = process.env.SALT_KEY;

function hashPassword (inputPassword) {
    var salt = bcrypt.genSaltSync(Number(SALT_KEY));
    return bcrypt.hashSync(inputPassword, salt);
}

function checkPassword (inputPassword, hashingPassword) {
    return bcrypt.compareSync(inputPassword, hashingPassword)    
}

module.exports = {
    hashPassword, 
    checkPassword
};
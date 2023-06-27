const {
    Account,
    AccountInformation
} = require('../../models');
const {
    hashPassword, checkPassword
} = require('../../utils/hashing');
const {
    generateToken
} = require('../../utils/jwt');


class AuthenticationService {
    static async login({
        email,
        password,
    }) {
        try {
            let user = await this.findUserExist({
                email
            });

            if (!user) throw ({
                status: 400,
                message: "Email or Password incorrect!"
            });

            if (!checkPassword(password, user.password)) throw ({
                status: 400,
                message: "Email or Password incorrect!"
            });

            let accessToken = generateToken({
                email,
            });

            return {
                accessToken
            }
        } catch (error) {
            throw ({
                error
            })
        }
    }

    static async register({
        email,
        password,
        confirmPassword,
        biodata,
        name
    }) {
        try {
            if (password !== confirmPassword) throw ({
                status: 400,
                message: "Password and Confirm Password doesn't match"
            });

            let exist = await this.findUserExist({
                email
            });

            if (exist) throw ({
                status: 400,
                message: 'User already exist!'
            });

            console.log({
                email: email,
                password: hashPassword(password)
            })

            let user = await Account.create({
                email: email,
                password: hashPassword(password)
            });

            await AccountInformation.create({
                name,
                biodata,
                accountId: user.id
            });

            let accessToken = generateToken({
                email,
            });

            return {
                accessToken
            }
        } catch (error) {
            throw ({
                error
            })
        }
    }

    static async findUserExist({
        email
    }) {
        return await Account.findOne({
            where: {
                email: email
            },
            attributes: [
                'email',
                'password'
            ]
        });
    }
}

module.exports = AuthenticationService;
const { Account } = require('../models');
const { verifyToken } = require('../utils/jwt');


async function auth(req, res, next) {
    const {
        access_token
    } = req.headers;

    try {
        const decoded = verifyToken(access_token);

        console.log(decoded);

        const user = await Account.findOne({
            where: {
                email: decoded.email
            }
        })

        if (user) {
            req.classified = {
                email: user.email,
                userId: user.id,
            }
            next()
        } else {
            throw({
                status: 400,
                message: "You are not authorized!"
            })
        }
    } catch (error) {
        next({
            error
        });
    }
}

module.exports = {
    auth
}
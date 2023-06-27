const AuthenticationService = require("./service");

class AuthenticationController {
    static async login(req, res, next) {
        try {
            res.status(200).json({
                success: true,
                message: "Successful login!",
                data: await AuthenticationService.login({
                    email: req.body.email,
                    password: req.body.password,
                }),
            });
        } catch (error) {
            next(error);
        }
    }

    static async register(req, res, next) {
        try {
            res.status(201).json({
                success: true,
                message: "Success create new account",
                data: await AuthenticationService.register({
                    email: req.body.email,
                    password: req.body.password,
                    confirmPassword: req.body.confirmPassword,
                    name: req.body.name,
                    biodata: req.body.biodata,
                })
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AuthenticationController;
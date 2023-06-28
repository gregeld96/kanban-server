const UserService = require("./service");

class UserController {
    static async getAll(req, res, next) {
        try {
            res.status(201).json({
                success: true,
                message: "Success get users",
                data: await UserService.getAllUser({
                    search: req.body.name,
                })
            });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController;
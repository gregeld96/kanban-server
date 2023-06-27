const SubtaskService = require("./service");


class SubTaskController {
    static async getById(req, res, next){
        try {
            res.status(200).json({
                success: true,
                message: "Success get detail subtask",
                data: await SubtaskService.getById({
                    id: req.params.id
                })
            });
        } catch (error) {
            next(error)
        }
    }
    static async create(req, res, next){
        try {
            await SubtaskService.create({
                description: req.body.description,
                taskId: req.body.taskId,
            });

            res.status(201).json({
                success: true,
                message: "Success create subtask"
            });
        } catch (error) {
            next(error)
        }
    }

    static async assign(req, res, next){
        try {
            await SubtaskService.assign({
                accountId: req.body.accountId,
                subtaskId: req.params.id
            });

            res.status(200).json({
                success: true,
                message: "Success assign user to a task"
            });
        } catch (error) {
            next(error)
        }
    }

    static async updateStatus(req, res, next){
        try {
            await SubtaskService.updateStatus({
                auth: req.classified,
                subtaskId: req.params.id
            });

            res.status(200).json({
                success: true,
                message: "Success update task status"
            });
        } catch (error) {
            next(error)
        }
    }

    static async removeData(req, res, next){
        try {
            await SubtaskService.removeData({
                id: req.params.id
            });
            
            res.status(200).json({
                success: true,
                message: "Successful delete subtask!",
            });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = SubTaskController;
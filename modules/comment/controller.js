const TaskCommentService = require("./service");


class TaskCommentController {
    static async create(req, res, next){
        try {
            await TaskCommentService.create({
                description: req.body.description,
                taskId: req.body.taskId,
                subId: req.body.subId,
                auth: req.classified,
            });

            res.status(201).json({
                success: true,
                message: "Success create comment"
            });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = TaskCommentController;
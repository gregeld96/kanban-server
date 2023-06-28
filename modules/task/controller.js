const TaskService = require("./service");


class TaskController {
    static async getBasedCategory(req, res, next){
        try {
            res.status(200).json({
                success: true,
                message: "Success get task based on category",
                data: await TaskService.getBasedCategory({
                    categoryId: req.params.categoryId
                })
            });
        } catch (error) {
            next(error)
        }
    }

    static async getById(req, res, next){
        try {
            res.status(200).json({
                success: true,
                message: "Success get detail task",
                data: await TaskService.getById({
                    id: req.params.id
                })
            });
        } catch (error) {
            next(error)
        }
    }

    static async create(req, res, next){
        try {
            await TaskService.create({
                title: req.body.title,
                description: req.body.description,
                category: req.body.category,
                auth: req.classified,
            });

            res.status(201).json({
                success: true,
                message: "Success create task"
            });
        } catch (error) {
            next(error)
        }
    }

    static async update(req, res, next){
        try {
            await TaskService.update({
                title: req.body.title,
                description: req.body.description,
                taskId: req.params.id,
                auth: req.classified,
            });

            res.status(200).json({
                success: true,
                message: "Success update task"
            });
        } catch (error) {
            next(error)
        }
    }

    static async assignAccount(req, res, next){
        try {
            await TaskService.assignAccount({
                accountId: req.body.accountId,
                taskId: req.params.id,
                auth: req.classified,
            });

            res.status(201).json({
                success: true,
                message: "Success assign user to the task"
            });
        } catch (error) {
            next(error)
        }
    }

    static async updateTaskCategory(req, res, next){
        try {
            await TaskService.updateCategory({
                category: req.body.category,
                taskId: req.params.id,
                auth: req.classified,
            });

            res.status(201).json({
                success: true,
                message: "Success update task category"
            });
        } catch (error) {
            next(error)
        }
    }

    static async removeData(req, res, next){
        try {
            await TaskService.removeData({
                id: req.params.id
            });
            
            res.status(200).json({
                success: true,
                message: "Successful delete task!",
            });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = TaskController;
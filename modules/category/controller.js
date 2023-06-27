const CategoryService = require("./service");

class CategoryController {
    static async getAll(req, res, next){
        try {
            res.status(200).json({
                success: true,
                message: "Successful create new category!",
                data: await CategoryService.getAll()
            });
        } catch (error) {
            next(error)
        }
    }

    static async create(req, res, next){
        try {
            await CategoryService.create({
                title: req.body.title,
                color: req.body.color
            });

            res.status(201).json({
                success: true,
                message: "Successful create new category!",
            });
        } catch (error) {
            next(error)
        }
    }

    static async update(req, res, next){
        try {
            await CategoryService.update({
                title: req.body.title,
                color: req.body.color,
                id: req.params.id
            });
            
            res.status(200).json({
                success: true,
                message: "Successful update category!",
            });
        } catch (error) {
            next(error)
        }
    }

    static async removeData(req, res, next){
        try {
            await CategoryService.removeData({
                id: req.params.id
            });
            
            res.status(200).json({
                success: true,
                message: "Successful delte category!",
            });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CategoryController;
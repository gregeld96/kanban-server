const { Category, Task, Subtask, Account } = require('../../models');
const { Op } = require('sequelize');

class CategoryService {
    static async getAll(){
        try {
            let list = await Category.findAll();

            return {
                list
            }
        } catch (error) {
            throw({
                error
            })
        }
    }

    static async findById({
        id
    }) {
        try {
            return {
                detail: await Category.findByPk(Number(id))
            }
        } catch (error) {
            throw({
                error
            })
        }
    }


    static async create({
        title,
        color
    }) {
        try {
            if(!title || !color) throw({
                status: 400,
                message: 'Fill up all the field'
            })

            let exist = await Category.findOne({
                where: {
                    title: {
                        [Op.iLike]: `${title}`
                    }
                }
            });

            if(exist) throw({
                status: 400,
                message: 'Category already exist!'
            });

            let lastNumber = await Category.count();

            let newCategory = {
                title,
                color,
                position: lastNumber + 1
            }

            await Category.create(newCategory);
        } catch (error) {
            throw({
                error
            })
        }
    }

    static async update({
        title,
        color,
        id
    }) {
        try {
            if(!title || !color) throw({
                status: 400,
                message: 'Fill up all the field'
            })

            let exist = await Category.findOne({
                where: {
                    title: {
                        [Op.iLike]: `${title}`
                    }
                }
            });

            let existId = await Category.findByPk(Number(id));

            if(exist.id !== Number(id)) throw({
                status: 400,
                message: 'Category already exist!'
            });

            if(!existId) throw({
                status: 404,
                message: 'Data not found!'
            })

            let updateCategory = {
                title: title ? title : existId.title,
                color: color ? color : existId.color,
            }

            await Category.update(updateCategory, {
                where: {
                    id
                }
            });
        } catch (error) {
            throw({
                error
            })
        }
    }

    static async removeData({
        id
    }){
        try {
            let existId = await Category.findByPk(Number(id));

            if(!existId) throw({
                status: 404,
                message: 'Data not found!'
            })

            await Category.destroy({
                where: {
                    id
                }
            });
        } catch (error) {
            throw({
                error
            })
        }
    }
}

module.exports = CategoryService;
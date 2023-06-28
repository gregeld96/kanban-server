const CategoryService = require("../category/service");
const {
    Category,
    Task,
    Subtask,
    TaskComment,
    TaskAccount,
    Account,
    AccountInformation
} = require('../../models')

class TaskService {
    static async getById({
        id
    }) {
        try {
            let detail = await Task.findByPk(Number(id), {
                include: [
                    {
                        model: Category,
                        as: 'category'
                    },
                    {
                        model: TaskComment,
                        as: 'comments',
                        // To show comment that only belong to the task only (Subtask comment not included)
                        // where: {
                        //     subtaskId: null,
                        // },
                        include: {
                            model: Account,
                            as: 'account',
                            attributes: [
                                'id',
                                'email'
                            ],
                            include: {
                                model: AccountInformation,
                                as: 'personal',
                                attributes: [
                                    'name'
                                ]
                            }
                        }
                    },
                    {
                        model: Account,
                        as: 'owner',
                        attributes: [
                            'id',
                            'email'
                        ],
                        include: {
                            model: AccountInformation,
                            as: 'personal',
                            attributes: [
                                'name'
                            ]
                        }
                    },
                    {
                        model: Subtask,
                        as: 'subtasks',
                        order: [["id", "DESC"]],
                        include: {
                            model: Account,
                            as: 'assignTo',
                            attributes: [
                                'id',
                                'email'
                            ],
                            include: {
                                model: AccountInformation,
                                as: 'personal',
                                attributes: [
                                    'name'
                                ]
                            }
                        }
                    },
                    {
                        model: TaskAccount,
                        as: 'assign',
                        include: {
                            model: Account,
                            as: 'assign',
                            attributes: [
                                'id',
                                'email'
                            ],
                            include: {
                                model: AccountInformation,
                                as: 'personal',
                                attributes: [
                                    'name'
                                ]
                            }
                        },
                    }
                ]
            });

            return {
                detail
            }
        } catch (error) {
            throw ({
                error
            })
        }
    }

    static async getBasedCategory({
        categoryId
    }) {
        try {
            let categoryExist = await CategoryService.findById({
                id: categoryId
            });

            if (!categoryExist.detail) throw ({
                status: 400,
                message: 'Use the correct category!'
            });

            let list = await Task.findAll({
                where: {
                    categoryId: categoryExist.detail.id
                },
                include: [{
                        model: Subtask,
                        as: 'subtasks',
                        include: {
                            model: Account,
                            as: 'assignTo',
                            attributes: [
                                'id',
                                'email'
                            ],
                            include: {
                                model: AccountInformation,
                                as: 'personal',
                                attributes: [
                                    'name'
                                ]
                            }
                        }
                    },
                    {
                        model: Account,
                        as: 'owner',
                        attributes: [
                            'id',
                            'email'
                        ],
                        include: {
                            model: AccountInformation,
                            as: 'personal',
                            attributes: [
                                'name'
                            ]
                        }
                    },
                    {
                        model: TaskAccount,
                        as: 'assign',
                        include: {
                            model: Account,
                            as: 'assign',
                            attributes: [
                                'id',
                                'email'
                            ],
                            include: {
                                model: AccountInformation,
                                as: 'personal',
                                attributes: [
                                    'name'
                                ]
                            }
                        },
                    }

                ]
            });

            return {
                list
            }
        } catch (error) {
            throw ({
                error
            })
        }
    }

    static async create({
        title,
        description,
        category,
        auth,
    }) {
        try {
            if (!title || !category) throw ({
                status: 400,
                message: 'Fill up all field!'
            })

            let categoryExist = await CategoryService.findById({
                id: category
            });

            if (!categoryExist.detail) throw ({
                status: 400,
                message: 'Use the correct category!'
            });

            let newTask = {
                title,
                description,
                categoryId: category,
                accountId: auth.userId
            }

            await Task.create(newTask);
        } catch (error) {
            throw ({
                error
            })
        }
    }

    static async update({
        title,
        description,
        taskId,
        auth,
    }) {
        try {
            if (!title) throw ({
                status: 400,
                message: 'Fill up all field!'
            });

            let taskExist = await this.getById({
                id: taskId
            });

            if((taskExist?.detail?.accountId !== auth.userId)) throw({
                status: 401,
                message: 'You are not authorized!'
            });

            let updateData = {
                title: title ?? taskExist.detail.title,
                description: description ?? taskExist.detail.description,
            }

            await Task.update(updateData, {
                where: {
                    id: taskId
                }
            });
        } catch (error) {
            throw ({
                error
            })
        }
    }

    static async assignAccount({
        accountId,
        taskId,
        auth,
    }) {
        try {
            let userExist = await Account.findByPk(Number(accountId));

            if (!userExist) throw ({
                status: 404,
                message: 'User not found!'
            });

            let taskExist = await this.getById({
                id: taskId
            });

            if (!taskExist?.detail) throw ({
                status: 404,
                message: 'Data not found!'
            });

            if(taskExist?.detail?.accountId !== auth.userId) throw({
                status: 401,
                message: 'You are not authorized'
            });

            await TaskAccount.create({
                taskId,
                accountId
            });
        } catch (error) {
            throw ({
                error
            })
        }
    }

    static async updateCategory({
        category,
        taskId,
        auth,
    }) {
        try {
            let categoryExist = await CategoryService.findById({
                id: category
            });

            if (!categoryExist.detail) throw ({
                status: 400,
                message: 'Use the correct category!'
            });

            let existId = await Task.findByPk(Number(taskId));

            if (!existId) throw ({
                status: 404,
                message: 'Data not found!'
            })

            if(existId.accountId !== auth.userId) throw({
                status: 401,
                message: 'You are not authorized!'
            })

            let updateTask = {
                categoryId: category,
            }

            await Task.update(updateTask, {
                where: {
                    id: taskId
                }
            });
        } catch (error) {
            throw ({
                error
            })
        }
    }

    static async removeData({
        id
    }) {
        try {
            let existId = await Task.findByPk(Number(id));

            if (!existId) throw ({
                status: 404,
                message: 'Data not found!'
            })

            await Task.destroy({
                where: {
                    id
                },
                include: [{
                        model: Subtask,
                        as: "subtasks"
                    },
                    {
                        model: TaskComment,
                        as: "comments"
                    },
                    {
                        model: TaskAccount,
                        as: "assignTo"
                    }
                ]
            });

            await TaskComment.destroy({
                where: {
                    taskId: id
                }
            });

            await Subtask.destroy({
                where: {
                    taskId: id
                }
            });

            await TaskAccount.destroy({
                where: {
                    taskId: id
                }
            });
        } catch (error) {
            throw ({
                error
            })
        }
    }
}

module.exports = TaskService;
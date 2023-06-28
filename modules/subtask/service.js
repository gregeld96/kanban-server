const {
    Task,
    Subtask,
    TaskComment,
    Account,
    AccountInformation
} = require('../../models');
const TaskService = require('../task/service');

class SubtaskService {
    static async getById({
        id
    }) {
        try {
            return {
                detail: await Subtask.findByPk(Number(id), {
                    include: [{
                        model: TaskComment,
                        as: 'comments',
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
                    }, {
                        model: Task,
                        as: 'task'
                    }]
                })
            }
        } catch (error) {
            throw ({
                error
            })
        }
    }

    static async create({
        taskId,
        description,
    }) {
        try {
            if (!description) throw ({
                status: 400,
                message: 'Description needed!'
            });

            let taskExist = await TaskService.getById({
                id: taskId
            });

            if (!taskExist?.detail) throw ({
                status: 404,
                message: 'Data not found!'
            });

            let newSub = {
                description,
                taskId,
                status: false
            };

            await Subtask.create(newSub);
        } catch (error) {
            throw ({
                error
            })
        }
    }

    static async assign({
        accountId,
        subtaskId
    }) {
        try {
            let userExist = await Account.findByPk(Number(accountId));

            if (!userExist) throw ({
                status: 404,
                message: 'User not found!'
            });

            let subtaskExist = await this.getById({
                id: subtaskId
            });

            if (!subtaskExist?.detail) throw ({
                status: 404,
                message: 'Data not found!'
            });

            await Subtask.update({
                assignId: accountId
            }, {
                where: {
                    id: subtaskId
                }
            });
        } catch (error) {
            throw ({
                error
            })
        }
    }

    static async updateStatus({
        auth,
        subtaskId
    }) {
        try {
            let subtaskExist = await this.getById({
                id: subtaskId
            });

            if (!subtaskExist?.detail) throw ({
                status: 404,
                message: 'Data not found!'
            });

            if((subtaskExist?.detail?.assignId !== auth.userId) && (subtaskExist?.detail?.task?.accountId !== auth.userId)) throw({
                status: 401,
                message: 'You are not authorized!'
            });

            await Subtask.update({
                status: !subtaskExist?.detail?.status
            }, {
                where: {
                    id: subtaskId
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
            let existId = await Subtask.findByPk(Number(id));

            if (!existId) throw ({
                status: 404,
                message: 'Data not found!'
            })

            await Subtask.destroy({
                where: {
                    id
                }
            });

            await TaskComment.destroy({
                where: {
                    subtaskId: id
                }
            });
        } catch (error) {
            throw ({
                error
            })
        }
    }
}

module.exports = SubtaskService;
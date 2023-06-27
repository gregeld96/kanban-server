const { TaskComment } = require('../../models');

class TaskCommentService {
    static async create({
        taskId,
        subId,
        description,
        auth
    }) {
        try {
            if(!description) throw({
                status: 400,
                message: 'Comment needed!'
            });

            let newComment = {
                taskId,
                subtaskId: subId,
                description,
                accountId: auth.userId
            }

            await TaskComment.create(newComment);
        } catch (error) {
            throw({
                error
            })
        }
    }

}

module.exports = TaskCommentService;
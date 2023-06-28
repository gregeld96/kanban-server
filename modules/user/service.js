const { Account, AccountInformation } = require('../../models');
const { Op } = require('sequelize');

class UserService {
    static async getAllUser({
        search
    }){
        try {
            let res = await AccountInformation.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${search}%`
                    }
                }
            });

            return {
                list: res
            }
        } catch (error) {
            throw({
                error
            })
        }
    }
}

module.exports = UserService;
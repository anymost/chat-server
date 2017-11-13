const {Friend, User} = require('../model');

async function fetchFriends(data) {
    try {
        const {id} = data;
        if (!id) {
            return Promise.resolve({
                code: 401,
                message: '需要传入用户ID'
            });
        }
        if (!/^\d+$/.test(id)) {
            return Promise.resolve({
                code: 402,
                message: '用户ID需要为数字'
            })
        }
        let friends = await Friend.findAll({
            attributes: ['friend'],
            where: {
                master: id
            }
        });
        const results = [];
        for (let item of friends) {
            const value =  await User.find({
                attributes:['id', 'name', 'avatar'],
                where: {
                    id: item.dataValues.friend
                }
            });
            results.push(value.dataValues);
        }

        return Promise.resolve({
            code: 200,
            message: '获取信息完成',
            data: results
        });
    } catch(error) {
        return Promise.resolve({
            code: 400,
            message: error || '获取信息失败'
        });
    }
}

module.exports = fetchFriends;
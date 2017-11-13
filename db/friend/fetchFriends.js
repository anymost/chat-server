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
        friends = await friends.map(async item => {
            let friend =  item.dataValues.friend;
            const value = await User.find({
                attributes:['id', 'name', 'avatar'],
                where: {
                    id: friend
                }
            });
            return value.dataValues;
        });
        console.log(friends);
        return Promise.resolve({
            code: 200,
            message: '获取信息完成',
            data: result
        });
    } catch(error) {
        return Promise.resolve({
            code: 400,
            message: error || '获取信息失败'
        });
    }
}

fetchFriends({
    id: 1507276718979
});
module.exports = fetchFriends;
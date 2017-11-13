const {Friend} = require('../model');

async function fetchFriends(data) {
    const {id} = data;
    if (!id) {
        return Promise.resolve({
            code: 401,
            message: '需要传入用户ID'
        });
    }
    if (!/^\d$/.test(id)) {
        return Promise.resolve({
            code: 402,
            message: '用户ID需要为数字'
        })
    }
    const result = await Friend.findAll({
        attributes: ['id', 'name', 'avatar'],
        where: {
            id
        }
    });
    console.log(result);
}

fetchFriends({
    id: 1507276718979
});
module.exports = fetchFriends;
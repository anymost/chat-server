const Friend = require('../model').Friend;
const idCreator = require('../../tools').idCreator;


async function addFriend (data) {
    try {
        const {userOne, userTwo} = data;
        if (!userOne || !userTwo) {
            return Promise.resolve({
                code: 401,
                message: '信息填写不完整'
            });
        }
        if (!/^\d+$/.test(userOne) || !/^\d+$/.test(userTwo)) {
            return Promise.resolve({
                code: 402,
                message: '用户ID格式有误，只能为数字'
            });
        }
        const idOne = idCreator();
        const createOne = await Friend.create({
            id: idOne,
            master: userOne,
            friend: userTwo
        });
        if (!createOne) {
            return Promise.resolve({
                code: 403,
                message: '存储用户信息失败'
            });
        }
        const idTwo = idCreator();
        const createTwo = await Friend.create({
            id: idTwo,
            master: userTwo,
            friend: userOne
        });

        if (!createTwo) {
            return Promise.resolve({
                code: 404,
                message: '存储用户信息失败'
            });
        }
        return Promise.resolve({
            code: 200,
            message: '好友添加完成'
        });
    } catch(error) {
        return Promise.resolve({
            code: 400,
            message: error || '添加好友失败'
        });
    }
}


module.exports = addFriend;
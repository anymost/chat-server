
const model = require('../model');
const {User} = model;

async function login (userInfo, callback){
    try {
        const data = await User.findAll({
            attributes: ['password', 'id', 'avatar'],
            where: {
                name: userInfo.userName
            }
        });
        if (data && data.length === 0) {
            callback({
                code: 401,
                message: '用户名不存在'
            });
            return;
        }

        const {id, password, avatar} = data[0].dataValues;
        if (password === userInfo.password) {
            callback({
                result: 200,
                message: '登陆成功',
                data: {
                    id: id,
                    name: userInfo.userName,
                    avatar: avatar
                }
            });
        } else {
            callback({
                code: 402,
                message: '密码不正确'
            });
        }
    } catch(error) {
        callback({
            code: 405,
            message: '查询错误'
        });
    }
}

module.exports = login;
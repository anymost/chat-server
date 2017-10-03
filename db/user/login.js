
const model = require('../model');
const {User} = model;

async function login (userInfo){
    try {
        const data = await User.findAll({
            attributes: ['password', 'id', 'avatar'],
            where: {
                name: userInfo.userName
            }
        });
        if (data && data.length === 0) {
            return Promise.resolve({
                code: 401,
                message: '用户名不存在'
            });
        }
        const {id, password, avatar} = data[0].dataValues;
        if (password === userInfo.password) {
            return Promise.resolve({
                code: 200,
                message: '登陆成功',
                data: {
                    id: id,
                    name: userInfo.userName,
                    avatar: avatar
                }
            });
        } else {
            return Promise.resolve({
                code: 402,
                message: '密码不正确'
            });
        }
    } catch(error) {
        return Promise.resolve({
            code: 405,
            message: '查询错误'
        });
    }
}

module.exports = login;
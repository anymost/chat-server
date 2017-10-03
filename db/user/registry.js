const model = require('../model');
const {idCreator} = require('../../tools');
const {User} = model;

async function registry(userInfo){
    try {
        let id = idCreator();
        const data = await User.create({
            id,
            name: userInfo.userName,
            password: userInfo.password,
            phone: parseInt(userInfo.phone),
            email: userInfo.email,
            avatar: userInfo.avatar
        });
        if (data) {
            return Promise.resolve({
                code: 200,
                message: '用户创建成功',
                data: {id}
            });
        } else {
            return Promise.resolve({
                code: 403,
                message: data
            });
        }

    } catch (error) {
        console.log(error);
        if(error.name === 'SequelizeUniqueConstraintError') {
            return Promise.resolve({
                code: 401,
                message: '用户名已存在'
            });
        }else{
            return Promise.resolve({
                code : 402,
                message : error.name || '用户创建失败'
            });
        }
    }
}


module.exports = registry;
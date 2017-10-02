const model = require('../model');
const {User} = model;

async function registry(userInfo, callback){
    try {
        const data = await User.create({
            id: userInfo.userId,
            name: userInfo.userName,
            password: userInfo.password,
            phone: userInfo.phone,
            email: userInfo.email,
            avatar: userInfo.avatar
        });
        data.then(() => {
            callback({
                code : 200,
                message : '用户创建成功'
            });
        });
    } catch (error) {
        if(error.name === 'SequelizeUniqueConstraintError') {
            callback({
                code: 401,
                message: '用户名已存在'
            });
        }else{
            callback({
                code : 402,
                message : error.name || '用户创建失败'
            });
        }
    }
}

module.exports = registry;
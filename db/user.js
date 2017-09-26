const model = require('./model');
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
                result: 401,
                message: '用户名已存在'
            });
        }else{
            callback({
                result : 402,
                message : error.name || '用户创建失败'
            });
        }
    }
}

exports.registry = registry;


async function login (userInfo, callback){
    const data = await User.findAll({
        attributes : ['password', 'userId', 'avatar'],
        where : {
            name : userInfo.userName
        }
    });

    data.then(function (result) {
        if(result.length === 0){
            callback({
                result : 401,
                message : '用户名不存在'
            });
        }else{
            let dataValues = result[0] && result[0].dataValues;
            const password = dataValues['password'];
            const id = dataValues['id'];
            const avatar = dataValues['avatar'];
            if(password === userInfo.password){
                callback({
                    result: 200,
                    message : '登陆成功',
                    data: {
                        id: id,
                        name: userInfo.userName,
                        avatar: avatar
                    }
                });
            }else {
                callback({
                    result : 402,
                    message : '密码不正确'
                });
            }
        }
    },  function (error) {
        callback({
            result : 403,
            message : error.name || '登陆失败'
        });
    });
}


exports.login = login;
const model = require('../model');
const {Chat, User} = model;


async function chatList (id = 0){
    try {
        const data = await Chat.findAll({
            attributes: ['sender', 'date', 'message'],
            where: {
                receiver: id
            }
        });
        if (data.length < 1) {
            return Promise.resolve({
                code: 402,
                message: '结果为空'
            });
        }
        let message = {};
        for (let item of data) {
            let chat = item.dataValues;
            if (!message[chat.sender]) {
                message[chat.sender] = {
                    data: []
                };

            }
            let info = {
                date: chat.date,
                message: chat.message
            };
            message[chat.sender].data.push(info);
        }

        let keys = Object.keys(message);
        let result = [];
        for (let item of keys) {
            const value = await User.findOne({
                 attributes: ['name', 'avatar'],
                 where: {
                     id: item
                 }
             });
            ({
                name: message[item].name,
                avatar: message[item].avatar
            } = value.dataValues);
            result.push({
                sender: item,
                name: message[item].name,
                avatar: message[item].avatar,
                data: message[item].data,
                sendData: []
            })
        }
        for(let i = 0; i < result.length; i++) {
            let item = result[i];
            let receiver = item.sender;
            const value = await Chat.findAll({
                attributes: ['date', 'message'],
                where: {
                    sender: id,
                    receiver
                }
            });
            for (let chat of value) {
                result[i].sendData.push({
                    message: chat.dataValues.message,
                    date: chat.dataValues.date
                });
            }
        }

        return Promise.resolve({
            code: 200,
            message: 'success',
            data: result
        });
    } catch(error) {
        console.log(error);
        return Promise.resolve({
            code: 401,
            message: '查询错误'
        });
    }
}

module.exports = chatList;
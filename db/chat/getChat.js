const model = require('../model');
const {Chat} = model;


async function getChat (id = 0, sender = 0){
    try {
        const receiveData = await Chat.findAll({
            attributes: ['date', 'message'],
            where: {
                receiver: id,
                sender
            }
        });
        if (receiveData.length < 1) {
            return Promise.resolve({
                code: 402,
                message: '结果为空'
            });
        }
        let message = [];
        for (let item of receiveData) {
            let chat = item.dataValues;
            let info = {
                date: chat.date,
                message: chat.message,
                messageType: 'receive'
            };
            message.push(info);
        }

        const sendData = await Chat.findAll({
            attributes: ['date', 'message'],
            where: {
                receiver: sender,
                sender: id
            }
        });
        if (sendData &&sendData.length > 1) {
            for (let item of sendData) {
                let chat = item.dataValues;
                let info = {
                    date: chat.date,
                    message: chat.message,
                    messageType: 'send'
                };
                message.push(info);
            }
        }

        return Promise.resolve({
            code: 200,
            message: 'success',
            data: message
        });
    } catch(error) {
        return Promise.resolve({
            code: 401,
            message: '查询错误'
        });
    }
}

module.exports = getChat;
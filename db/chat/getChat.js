const model = require('../model');
const {Chat, User} = model;


async function getChat (id = 0, sender = 0){
    try {
        let message = [];

        const senderInfo = await User.find({
            attributes: ['name', 'avatar'],
            where: {
                id: sender
            }
        });
        const {name: senderName, avatar: senderAvatar} = senderInfo.dataValues;

        const receiveData = await Chat.findAll({
            attributes: ['date', 'message'],
            where: {
                receiver: id,
                sender
            }
        });

        if (!!receiveData) {
            for (let item of receiveData) {
                let chat = item.dataValues;
                let info = {
                    date: chat.date,
                    message: chat.message,
                    messageType: 'receive',
                    name: senderName,
                    avatar: senderAvatar
                };
                message.push(info);
            }
        }



        const sendData = await Chat.findAll({
            attributes: ['date', 'message'],
            where: {
                receiver: sender,
                sender: id
            }
        });
        if (!!sendData) {
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

        if (message.length < 1) {
            return Promise.resolve({
                code: 402,
                message: '结果为空'
            });
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
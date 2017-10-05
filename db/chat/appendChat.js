const Chat = require('../model').Chat;
const idCreator = require('../../tools').idCreator();

async function appendChat(info) {
    try {
        const {sender, receiver, message} = info;
        const id = idCreator;
        const date = new Date();
        await Chat.create({
            id,
            sender,
            receiver,
            message,
            date
        });
        return Promise.resolve({
            code: 200,
            message: '发送成功'
        });
    } catch (error) {
        return Promise.resolve({
            code: 401,
            message: error.name || '存储失败'
        });
    }

}

module.exports = appendChat;
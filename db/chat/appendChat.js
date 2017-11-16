const Chat = require('../model').Chat;
const ChatList = require('../model').ChatList;

async function appendChat(info) {
    try {
        const {sender, receiver, message, id, date} = info;
        await Chat.create({
            id,
            sender,
            receiver,
            message,
            date
        });
        const result = await ChatList.find({
            attributes: ['id'],
            where: {
                sender,
                receiver
            }
        });
        if (result) {
            await ChatList.destroy({
                where: {
                    sender,
                    receiver
                }
            });
        }
        await ChatList.create({
           id,
           sender,
           receiver,
           date,
           message
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
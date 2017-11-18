const Chat = require('../model').Chat;
const ChatList = require('../model').ChatList;
const {idCreator} = require('../../tools');

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

appendChat({
    id: idCreator(),
    sender: '1507277010058',
    receiver: '1507276718979',
    message: '{"type":1,"message":"hello world"}',
    date: new Date()
}).then(value => {
    console.log(value);
});

module.exports = appendChat;
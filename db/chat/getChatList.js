const model = require('../model');
const {ChatList, User} = model;


async function getChatList (id = 0){
    try {
        const sendData = await ChatList.findAll({
            attributes: ['receiver', 'date', 'message'],
            where: {
                sender: id
            }
        });
        const receiveData = await ChatList.findAll({
            attributes: ['sender', 'date', 'message'],
            where: {
                receiver: id
            }
        });
        const mergeData = sendData.concat(receiveData);
        if (mergeData.length < 1) {
            return Promise.resolve({
                code: 402,
                message: '结果为空'
            });
        }
        let message = [];
        for (let item of mergeData) {
            let chat = item.dataValues;
            if (!!chat.receiver) {
                message.push({
                    sender: chat.receiver,
                    date: chat.date,
                    message: chat.message
                });
            } else {
                let isEqual = false;
                for(let i = 0; i < message.length; i++) {
                    if (message[i].sender === chat.sender) {
                        if (chat.date.valueOf() > message[i].date.valueOf()) {
                            message[i].date = chat.date;
                            message[i].message = chat.message;
                        }
                        isEqual = true;
                    }
                }
                if (!isEqual) {
                    message.push(chat);
                }
            }
        }

        for (let i = 0; i < message.length; i++) {
            let item = message[i];
            const value = await User.findOne({
                attributes: ['name', 'avatar'],
                where: {
                    id: item.sender
                }
            });
            ({
                name: message[i].name,
                avatar: message[i].avatar
            } = value.dataValues);
        }
        message.sort((x, y) => {
            return x.date.valueOf() < y.date.valueOf();
        });
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



module.exports = getChatList;
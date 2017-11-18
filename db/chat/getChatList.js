const model = require('../model');
const {ChatList, User} = model;


async function getChatList (id = 0){
    try {
        const data = await ChatList.findAll({
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
        let message = [];
        for (let item of data) {
            let chat = item.dataValues;
            message.push({
                sender: chat.sender,
                date: chat.date,
                message: chat.message
            });
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
            let result = await ChatList.findOne({
                attributes: ['date', 'message'],
                where: {
                    sender: id,
                    receiver: item.sender
                }
            });
            if (result) {
                result = result.dataValues;
                if (result.date.valueOf() > item.date.valueOf()) {
                    message[i].date = result.date;
                    message[i].message = result.message
                }
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



module.exports = getChatList;
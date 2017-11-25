const model = require('../model');
const {ChatList} = model;


async function deleteChatList (id = 0, sender = 0){
    try {
        await ChatList.destroy({
            where: {
                sender: id,
                receiver: sender
            }
        });
        await ChatList.destroy({
            where: {
                sender: sender,
                receiver: id
            }
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



module.exports = deleteChatList;
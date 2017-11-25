const router = require('koa-router')();
const deleteChat = require('../../db/chat/deleteChatList');

router.prefix('/api');

router.post('/deleteChatList', async (ctx) => {
    const {id, sender} = ctx.request.body;
    if (id && sender) {
        const value = await deleteChat(id, sender);
        ctx.body = value;
    } else {
        ctx.body = {
            code: 400,
            message: '用户信息不存在'
        };
    }

});

module.exports = router;
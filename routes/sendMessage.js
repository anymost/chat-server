const router = require('koa-router')();
const append = require('../db/chat').appendChat;

router.prefix('/api');

router.post('/sendMessage', async (ctx) => {
    const {sender, receiver, message} = ctx.request.body;
    if (sender && receiver && message) {
        const value = await append({sender, receiver, message});
        ctx.body = value;
    } else {
        ctx.body = {
            code: 400,
            message: '信息填写不完整'
        };
    }

});

module.exports = router;
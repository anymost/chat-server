const router = require('koa-router')();
const getChat = require('../../db/chat/getChat');

router.prefix('/api');

router.post('/getChat', async (ctx) => {
    const {id, sender} = ctx.request.body;
    if (id && sender) {
        const value = await getChat(id, sender);
        ctx.body = value;
    } else {
        ctx.body = {
                 code: 400,
                 message: '用户信息不存在'
            };
    }

});

module.exports = router;
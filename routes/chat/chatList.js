const router = require('koa-router')();
const chatList = require('../../db/chat/chatList');

router.prefix('/api');

router.get('/chatList/:id', async (ctx) => {
    const url = ctx.request.url;
    const reg = /\/api\/chatList\/(\d+)/;
    const id = (reg.exec(url)||[])[1];
    if (id) {
        const value = await chatList(id);
        ctx.body = value;
    } else {
        ctx.body = {
                 code: 400,
                 message: '用户信息不存在'
            };
    }

});

module.exports = router;
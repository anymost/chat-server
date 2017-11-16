const router = require('koa-router')();
const getChatList = require('../../db/chat/getChatList');

router.prefix('/api');

router.get('/getChatList', async (ctx) => {
    const {id} = ctx.request.body;
    if (id) {
        const value = await getChatList(id);
        ctx.body = value;
    } else {
        ctx.body = {
            code: 400,
            message: '用户信息不存在'
        };
    }

});

module.exports = router;
const router = require('koa-router')();

router.prefix('/api');

router.get('/chatList/:id', async (ctx) => {
    const {id} = ctx.request.body;
    if (id) {
        ctx.body = {};
    } else {
        ctx.body = {
            code: 400,
            message: '信息填写不完整'
        };
    }

});

module.exports = router;
const login = require('../db/user').login;
const router = require('koa-router')();

router.prefix('/api');

router.post('/login', async (ctx, next) => {
    console.log(ctx.request)
    ctx.body = {
        message: 'ok',
        data: 'login success'
    }
});

module.exports = router;
const router = require('koa-router')();
const login = require('../db/user').login;

router.prefix('/api');

router.post('/login', async (ctx) => {
    const {userName: userName = '', password: password = ''} = ctx.request.body;
    if (userName && password) {
        await login({userName, password}, (value) => {
            ctx.body = value;
        });
    } else {
        ctx.body = {
            code: 400,
            message: '信息填写不完整'
        };
    }

});

module.exports = router;
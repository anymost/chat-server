const router = require('koa-router')();
const login = require('../db/user').login;
const setCookie = require('../util/cookie').setCookie;

router.prefix('/api');

router.post('/login', async (ctx) => {
    const {userName: userName = '', password: password = ''} = ctx.request.body;
    if (userName && password) {
        await login({userName, password}, (value) => {
            // ctx.response.set({
            //     'Access-Control-Allow-Origin': 'http://localhost:3000',
            //     'Access-Control-Allow-Credentials': true
            // });
            setCookie(ctx, 'id', value.data.id);
            setCookie(ctx, 'name', value.data.name);
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
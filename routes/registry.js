const router = require('koa-router')();
const registry = require('../db/user').registry;

router.prefix('/api');

router.post('/registry', async (ctx) => {
    const {
        userName: userName = '',
        password: password = '',
        phone: phone = 0,
        email: email = '',
        avatar: avatar = ''
    } = ctx.request.body;
    if (userName && password && phone && email && avatar) {
        let value = await registry({userName, password, phone, email, avatar});
        ctx.body = value;
    } else {
        ctx.body = {
            code: 400,
            message: '信息填写不完整'
        };
    }

});

module.exports = router;
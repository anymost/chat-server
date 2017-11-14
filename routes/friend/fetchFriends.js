const router = require('koa-router')();
const fetchFriends = require('../../db/friend/fetchFriends');

router.prefix('/api');

router.get('/fetchFriends', async (ctx) => {
    const data = ctx.request.query;
    if (data) {
        const value = await fetchFriends(data);
        ctx.body = value;
    } else {
        ctx.body = {
            code: 400,
            message: '参数未提交完整'
        };
    }

});

module.exports = router;
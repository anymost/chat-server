const router = require('koa-router')();
const fetchFriends = require('../../db/friend/fetchFriends');

router.prefix('/api');

router.get('/fetchFriends', async (ctx) => {
    const data = ctx.requese.body;
    if (data) {
        const value = await fetchFriends(data);
        ctx.body = value;
    } else {
        ctx.body = {
            code: 400,
            message: '上传信息有误'
        };
    }

});

module.exports = router;
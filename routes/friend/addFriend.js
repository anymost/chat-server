const router = require('koa-router')();
const addFriend = require('../../db/friend/addFriend');

router.prefix('/api');

router.get('/addFriend', async (ctx) => {
    const data = ctx.requese.body;
    if (data) {
        const value = await addFriend(data);
        ctx.body = value;
    } else {
        ctx.body = {
            code: 400,
            message: '上传信息有误'
        };
    }

});

module.exports = router;
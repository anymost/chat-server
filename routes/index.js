const router = require('koa-router')()

router.post('/', async (ctx, next) => {
  console.log(ctx.request)
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.post('/json', async (ctx, next) => {
  console.log(ctx.request)
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router

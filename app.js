const Koa = require('koa')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const kors = require('koa-cors')
const app = new Koa()
const index = require('./routes/index')
const users = require('./routes/users')
const login = require('./routes/login')
const upload = require('./routes/upload')
const registry = require('./routes/registry')
const getChatList = require('./routes/chat/getChatList')
const getChat = require('./routes/chat/getChat')
const sendMessage = require('./routes/chat/sendMessage')
const fetchFriends = require('./routes/friend/fetchFriends')
const deleteChatList = require('./routes/chat/deleteChatList')



// error handler
onerror(app)

// middlewares

app.use(kors({
    'Access-Control-Allow-Origin': 'localhost:3000'
}))

app.use(bodyparser({enableTypes:['json', 'form', 'text']}))



app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/images'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))


app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})



app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(login.routes(), login.allowedMethods())
app.use(upload.routes(), upload.allowedMethods())
app.use(registry.routes(), registry.allowedMethods())
app.use(getChat.routes(), getChat.allowedMethods())
app.use(getChatList.routes(), getChatList.allowedMethods())
app.use(sendMessage.routes(), sendMessage.allowedMethods())
app.use(fetchFriends.routes(), fetchFriends.allowedMethods())
app.use(deleteChatList.routes(), deleteChatList.allowedMethods())


app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app

const client = require('./common');

client.rpush('hello', [1, 2, 3])
client.llen('hello').then(value => {
    console.log(value)
})
const client = require('./common');


client.llen('hello').then(value => {
    console.log(value)
})
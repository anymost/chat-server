const client = require('./common');

 async function saveMessage(message) {
    return await client.hmset('nice', {'key': 'value'})
}

saveMessage().then(value => {
    console.log(value)
});
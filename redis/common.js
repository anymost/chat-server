const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis.createClient.prototype);
let client = redis.createClient('6379', 'localhost');

module.exports = client;
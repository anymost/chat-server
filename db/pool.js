const Sequelize = require('sequelize');

const Pool = new Sequelize('chat', 'root', 'zhangyizheng', {
   host: 'localhost',
   dialect: 'mysql',
   pool: {
       max: 5,
       min: 0,
       idle: 10000
   }
});

module.exports = Pool;
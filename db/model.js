const Sequelize = require('sequelize');
const Pool = require('./pool');

const User = Pool.define('users', {
    id: {
        type: Sequelize.DOUBLE,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.DOUBLE
    },
    email: {
        type: Sequelize.STRING
    },
    avatar: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

/*User.sync({force: false});*/

exports.User = User;
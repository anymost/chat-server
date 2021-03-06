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

const Chat = Pool.define('chat', {
    id: {
        type: Sequelize.DOUBLE,
        primaryKey: true,
        autoIncrement: true
    },
    receiver: {
        type: Sequelize.DOUBLE,
        references: {
            model: User,
            key: 'id'
        }
    },
    sender: {
        type: Sequelize.DOUBLE,
        references: {
            model: User,
            key: 'id'
        }
    },
    date: {
        type: Sequelize.DATE
    },
    message: {
        type: Sequelize.STRING
    }
});

const ChatList = Pool.define('chatlist', {
    id: {
        type: Sequelize.DOUBLE,
        primaryKey: true,
        autoIncrement: true
    },
    receiver: {
        type: Sequelize.DOUBLE,
        references: {
            model: User,
            key: 'id',

        }
    },
    sender: {
        type: Sequelize.DOUBLE,
        references: {
            model: User,
            key: 'id',
        }
    },
    date: {
       type: Sequelize.DATE
    },
    message: {
        type: Sequelize.STRING
    }
});

const Friend = Pool.define('friend', {
    id: {
        type: Sequelize.DOUBLE,
        primaryKey: true,
        autoIncrement: true
    },
    master: {
        type: Sequelize.DOUBLE,
        references: {
            model: User,
            key: 'id',
        }
    },
    friend: {
        type: Sequelize.DOUBLE,
        references: {
            model: User,
            key: 'id',
        }
    }
});

// User.sync({force: false});
// Chat.sync({force: false});
// Friend.sync({force: false});
// ChatList.sync({force: false});

exports.User = User;
exports.Chat = Chat;
exports.ChatList = ChatList;
exports.Friend = Friend;
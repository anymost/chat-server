/**
 * Created by lenovo on 2017/4/10.
 */
var socketIO = {};
var socket_io = require('socket.io');


//获取io
socketIO.getSocketIO = function (server){

    var io = socket_io.listen(server);

    io.sockets.on('connection', function (socket){
        socket.on('ws', value => {

            socket.emit('heartbeat', value);
        })

    });
};

module.exports = socketIO;
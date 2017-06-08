var socket = require('socket.io');

module.exports = function(server) {
    var io = socket.listen(server);

    io.on('connection', function(socket){
        // broadcast a bid to other users
        socket.on('bid:send', function (data) {
            socket.broadcast.emit('bid:send', data);
        });

        // broadcast a bid to other users
        socket.on('bid:reset', function () {
            socket.broadcast.emit('bid:reset');
        });
    });

    return io;
}
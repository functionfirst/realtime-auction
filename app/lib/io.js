const socket = require('socket.io');

const socketEvents = socket => {
    // broadcasts a bid to other users
    socket.on('bid:send', function (data) {
        socket.broadcast.emit('bid:send', data);
    });
}

const socketIO = server => {
    let io = socket.listen(server);
    io.on('connection', socketEvents);
    return io;
}

module.exports = socketIO;

const socket = require('socket.io');

const socketEvents = socket => {
    socket.on('newBid', function (auction) {
        socket.broadcast.emit('newBid', auction);
    });
}

const socketIO = server => {
    let io = socket.listen(server);
    io.on('connection', socketEvents);
    return io;
}

module.exports = socketIO;

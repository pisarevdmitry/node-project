const io = require('socket.io');

class Chat {
    constructor(){
        this.chat = io;
        this.users ={}
    }
    listen(server){
        this.chat = this.chat.listen(server)
        this.connect()
    }
    connect() {
        this.chat.on('connection', socket => {
            const newUser ={
                    username: socket.handshake.headers.username,
                    id: socket.id
                }
            this.users = {...this.users,[socket.id]: newUser}
            socket.broadcast.emit('new user', newUser);

            socket.emit('all users', this.users);
            
            this.onMessage(socket)
            this.onDisconnect(socket)
          });
    }
    onDisconnect(socket) {
        socket.on('disconnect', () => {
            socket.broadcast.emit('delete user', socket.id);
            const obj = {...this.users};

            delete obj[socket.id];
            this.users = {...obj}
          });
    }
    onMessage(socket) {
        socket.on('chat message', (msg) => {
            socket.broadcast.emit('chat message', msg, socket.id);
          });
    }        
}

module.exports = Chat
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 8080;
const MAX_ROOMS = 3;


app.use('/js', express.static(__dirname + '/js'));
app.use('/style', express.static(__dirname + '/style'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/root', express.static(__dirname + '/'));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('view options', { layout: true } );


const players = {};
const rooms = {};


server.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
});

app.get('/', (request, response) => {
    response.render('index', {rooms: rooms});
});

app.get('/:room', (request, response) => {
    if (rooms[request.params.room] != null)
        response.render('room', { roomName: request.params.room })
    else
        response.redirect('/')
});

app.post('/room', (request, response) => {
    if (request.body.room !== "" && request.body.room != null) {
        if (rooms[request.body.room] != null || rooms.length >= MAX_ROOMS) {
            return response.redirect('/')
        }
        rooms[request.body.room] = { players: {} };
        response.redirect(request.body.room)
        // Emit new message that a new room was created
        io.emit('room-created', request.body.room)
    } else {
        return response.redirect('/')
    }
});

io.on('connection', socket => {
    if (players[socket.id] == null)
        console.log(`New user connected with socket id ${socket.id}`);
    else
        console.log(`New user connected with the name ${players[socket.id]}`)
    socket.emit('chat-message', `Welcome to SnapONap!`);

    socket.on('game-started', (room, message) => {
        console.log(`Message from client: ${message}`);
        socket.join(room);
        socket.to(room).broadcast.emit('game-started', message);
    });

    socket.on('game-ended', (room, message) => {
        console.log(`Message from client at ${room}: ${message}`);
        socket.join(room);
        socket.to(room).broadcast.emit('game-ended', message)
    });

    socket.on('disconnect', () => {
        if (players[socket.id] != null && players[socket.id] !== "")
            console.log(`${players[socket.id]} disconnected`)
        else
            console.log(`User with socket id ${socket.id} disconnected`)
        delete players[socket.id];
    });

    socket.on('new-user-name', (room, name) => {
        socket.join(room);
        rooms[room].players[socket.id] = name;
        socket.to(room).broadcast.emit('user-connected', name)
    })

});


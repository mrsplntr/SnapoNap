const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 8080;


app.use('/js', express.static(__dirname + '/js'));
app.use('/style', express.static(__dirname + '/style'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/root', express.static(__dirname + '/'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('view options', { layout: true } );

const players = {};


server.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
});

app.get('/', (request, response) => {
    response.render('index');
});

io.on('connection', socket => {
    if (players[socket.id] == null)
        console.log(`New user connected with socket id ${socket.id}`);
    else
        console.log(`New user connected with the name ${players[socket.id]}`)
    socket.emit('chat-message', `Welcome to SnapONap!`);

    socket.on('game-started', message => {
        console.log(`Message from client: ${message}`);
        socket.broadcast.emit('game-started', message);
    });

    socket.on('game-ended', message => {
        console.log(`Message from client: ${message}`);
        socket.broadcast.emit('game-ended', message)
    });

    socket.on('disconnect', () => {
        console.log('User disconnected')
    });

    socket.on('new-user-name', name => {
        players[socket.id] = name;
        socket.broadcast.emit('user-connected', name)
    })

});


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


server.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
});

app.get('/', (request, response) => {
    response.render('index');
});

io.on('connection', socket => {
    console.log(`New User connected with socket id ${socket.id}`);
    socket.emit('chat-message', `Hello SnapONap!`)
});
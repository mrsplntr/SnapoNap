const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 8080;


app.use('/js', express.static(__dirname + '/js'));
app.use('/style', express.static(__dirname + '/style'));


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('view options', { layout: true } );


server.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
});

app.get('/', (request, response) => {
    response.render('index');
});
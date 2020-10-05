const socket = io('http://localhost:8080');
const onStartButton = document.getElementById('onStart');

const name = prompt('Please enter your name');

socket.emit('new-user-name', name);

onStartButton.addEventListener('click', e => {
    e.preventDefault();
    if (name == null) {
        socket.emit('game-started', `User with socket id ${socket.id} started their game!`);
    } else {
        socket.emit('game-started', `User ${name} started their game!`);
    }
});

function emitEndGame() {
    if (name == null) {
        socket.emit('game-ended', `User with socket id ${socket.id} ended their game`)
    } else {
        socket.emit('game-ended', `${name} ended their game`)
    }
}

socket.on('chat-message', data => {
    console.log(data)
});

socket.on('user-connected', name => {
    console.log(`${name} connected!`)
});

socket.on('game-started', message => {
    console.log(message);
});

socket.on('game-ended', message => {
    console.log(message);
});
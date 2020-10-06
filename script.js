const socket = io('http://localhost:8080');
const onStartButton = document.getElementById('onStart');
const roomContainer = document.getElementById('room-container');


if (onStartButton != null) {
    const name = prompt('Please enter your name');
    socket.emit('new-user-name', roomName, name);

    onStartButton.addEventListener('click', e => {
        e.preventDefault();
        if (name == null || name === "") {
            socket.emit('game-started', `User with socket id ${socket.id} started their game!`);
        } else {
            socket.emit('game-started', `User ${name} started their game!`);
        }
    });

    function emitEndGame() {
        if (name == null || name === "") {
            socket.emit('game-ended', `User with socket id ${socket.id} ended their game`)
        } else {
            socket.emit('game-ended', `${name} ended their game`)
        }
    }
}

socket.on('room-created', roomName => {
    const roomElement = document.createElement('div');
    roomElement.innerText = roomName;
    const roomLink = document.createElement('a');
    roomLink.href = `/${roomName}`;
    roomLink.innerText = 'Join';
    roomContainer.append(roomElement);
    roomContainer.append(roomLink);
});

socket.on('chat-message', data => {
    console.log(data)
});

socket.on('user-connected', (room, name) => {
    console.log(`${name} connected to ${room} room!`)
});

socket.on('game-started', message => {
    console.log(message);
});

socket.on('game-ended', message => {
    console.log(message);
});
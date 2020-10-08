const socket = io('http://localhost:8080');
const onStartButton = document.getElementById('onStart');
const roomContainer = document.getElementById('room-container');


if (onStartButton != null) {
    const name = prompt('Please enter your name');
    socket.emit('new-user-name', roomName, name);

    onStartButton.addEventListener('click', e => {
        e.preventDefault();
        if (name == null || name === "") {
            const message = `User with socket id ${socket.id} started their game at ${roomName}!`;
            socket.emit('game-started', roomName, message);
        } else {
            const message = `User ${name} started their game at ${roomName}!`;
            socket.emit('game-started', roomName, message);
        }
    });

    function emitEndGame() {
        if (name == null || name === "") {
            const message = `User with socket id ${socket.id} ended their game at ${roomName} 
            with ${displayScore.innerText} points!`;
            socket.emit('game-ended', roomName, message)
        } else {
            const message = `User ${name} ended their game at ${roomName} with ${displayScore.innerText} points!`;
            socket.emit('game-ended', roomName, message)
        }
    }
} else {
    socket.on('room-created', roomName => {
        const roomElement = document.createElement('div');
        roomElement.innerText = roomName;
        const roomLink = document.createElement('a');
        roomLink.href = `/${roomName}`;
        roomLink.innerText = 'Join';
        roomContainer.append(roomElement);
        roomContainer.append(roomLink);
    });
}

socket.on('chat-message', data => {
    console.log(data)
});

socket.on('user-connected', name => {
    console.log(`${name} connected to room ${roomName}!`)
});

socket.on('user-disconnected', name => {
    console.log(`${name} has left the room`)
});

socket.on('game-started', message => {
    console.log(message);
});

socket.on('game-ended', message => {
    console.log(message);
});
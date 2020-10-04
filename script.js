const socket = io('http://localhost:8080');

socket.on('chat-message', data => {
    console.log(data)
});
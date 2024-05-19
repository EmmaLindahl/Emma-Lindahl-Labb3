const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 3000;

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log(`A client with id ${socket.id} connected to the chat!`);

  socket.on('chatMessage', msg => {
    console.log('Meddelande: ' + msg.user + ' ' + msg.message);
    io.emit('newChatMessage', {user: msg.user, message: msg.message});
  });

  socket.on('disconnect', () => {
    console.log(`Client ${socket.id} disconnected!`);
  });
});

server.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

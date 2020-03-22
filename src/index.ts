import express from 'express';
import http from 'http';
import socket from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.get('/', (req, res) => {
  res.sendFile(`${process.cwd()}/public/index.html`);
});

io.on('connection', (sock) => {
  sock.on('chat message', (msg: string) => {
    io.emit('chat message', msg);
  });
});

server.listen(3000, function () {
  console.log('listening on *:3000');
});

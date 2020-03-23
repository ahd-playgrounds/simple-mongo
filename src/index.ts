import express from 'express';
import http from 'http';
import socket from 'socket.io';
import './db';

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

const PORT = parseInt(process.env.NODE_PORT || '8080');
server.listen(PORT, function () {
  console.log(`listening on *:${PORT}`);
});

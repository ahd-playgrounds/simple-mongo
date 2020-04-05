import express from 'express';
import http from 'http';
import socket from 'socket.io';
import db from './db';
import Msg, { IMsg } from './models/msg';

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.get('/', (req, res) => {
  res.sendFile(`${process.cwd()}/public/index.html`);
});

io.on('connection', (sock) => {
  Msg.find().then((msgs) => {
    console.log('new client, sending history');
    io.emit(
      'chat history',
      msgs.map((x) => x.get('msg')),
    );
  });

  sock.on('chat message', (msg: string) => {
    Msg.create({ msg, user: 'Bob' })
      .then((res) => {
        console.log('written');
        console.log(res);
      })
      .catch(() => {
        'oops';
      });
    io.emit('chat message', msg);
  });
});

// TODO: https://docs.docker.com/compose/startup-order/
const PORT = parseInt(process.env.NODE_PORT || '8080', 10);

(async (): Promise<void> => {
  await db();
  server.listen(PORT, function () {
    console.log(`listening on *:${PORT}`);
  });
})();

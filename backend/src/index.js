const WebSocketServer = require('ws').Server;

const wss = new WebSocketServer({ port: 8080, path: '/ws' });
wss.on('connection', ws => {
  console.log('connection');
  ws.send('wqer');
});

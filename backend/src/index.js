const WebSocketServer = require('ws').Server;
const CubeGame = require('./cube-game');
const { MSG_GET_FULL_STATE, ERR_INVALID_FORMAT } = require('./constants');

const wss = new WebSocketServer({ port: 8080, path: '/ws' });
const game = new CubeGame(5, 40, 20);

wss.on('connection', ws => {  
  ws.on('message', e => {
    try {
      const message = JSON.parse(e);
      handleMessage(ws, message);
    } catch (err) {
      if (err instanceof SyntaxError) {
        ws.send(JSON.stringify({ code: ERR_INVALID_FORMAT }))
      } else {
        throw err;
      }
    }
  });
});

/**
 * @param {WebSocket} ws 
 * @param {any} message 
 */
function handleMessage(ws, message) {
  switch (message.code) {
    case MSG_GET_FULL_STATE:
      ws.send(JSON.stringify({
        code: MSG_GET_FULL_STATE,
        data: {
          colors: game.colors,
          score: game.score
        }
      }));
      break;
  }
}

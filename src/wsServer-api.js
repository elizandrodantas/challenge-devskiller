const WebSocketServer = require('ws');

function handlerError(){
  console.log(`some error occurred in WebSocketServer`)
}

function handlerAdd(step, data){
  try{
    let { update_id, username, ts, newSteps } = JSON.parse(data);

    if(typeof update_id !== "string") return null;

    return step.add(username, ts, newSteps);
  }catch(err){
    return null;
  }
}

module.exports = (stepService) => {
  const WEBSOCKET_PORT = 8081,
    server = new WebSocketServer.Server({ port: WEBSOCKET_PORT });

  // * TODO: Write the WebSocket API for receiving `update`s,
  //         using `stepService` for data persistence.
  // * TODO: Make sure to return an instance of a WebSocketServer,
  //         which contains `close()` method.

  // console.log(stepService.add({
  //   "update_id": "c0efd8a1-b3b8-49b7-92b1-69edc8bd6c0c",
  //   "username": "jenna",
  //   "ts": 1503031275211,
  //   "newSteps": 17
  // }))

  server.on('connection', (wss) => {
    wss.on("message", data => {
        handlerAdd(stepService, data);
    });

    wss.onerror = handlerError;
  });

  return server;
};

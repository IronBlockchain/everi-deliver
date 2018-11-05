const WebSocket = require('ws');
 
const wss = new WebSocket.Server({ port: 8080 });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
  if (client.readyState === WebSocket.OPEN) {
    client.send(data);
  }
});
};

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
  console.log('received: %s', message);
  var jsonMsg = JSON.parse(message);

  if("receiver" in  jsonMsg){
      wss.broadcast(jsonMsg["receiver"]);
  } else{
    console.log("receiver not defined");
  }

  });
  ws.send('connection established');
});

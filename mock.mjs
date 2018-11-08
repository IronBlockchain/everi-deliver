import WebSocket from 'ws'

const ws = new WebSocket('ws://192.168.178.22:1337')

ws.onopen = () => {
  // connection opened
  console.log('is opened')
  ws.send(JSON.stringify({type:'prove_token'})); // send a message
};
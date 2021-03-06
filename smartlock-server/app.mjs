const WebSocket = require('ws');
import {issueTokenCall, transferToAmazon, destroyTokenCall, validateToken, transferTokenToDeliver,
  createLinkCall, everiPassCall, addVideoData, checkData} from '../src/utils/api.mjs';

const receiverType = {
  SHOP: 'shop',
  USER: 'user',
}

const receiverGroup = {
  ALL: [receiverType.SHOP, receiverType.USER],
  SHOP: [receiverType.SHOP],
  USER: [receiverType.USER],
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const messageType = {
  user: {
    ISSUE: 'issueToken',
    CONFIRM: 'confirm'
  },
  shop: {
    PROVE_TOKEN: 'prove_token',
  },
  deliver: {
    GENERATE_PASS: 'generate_pass',
    PASS_REQUEST: 'pass_request',
    LEAVE_ROOM: 'leave_room'
  },
  //ISSUE: 'issueToken',
  ISSUE_WAIT: 'issueToken_wait',
  TRANSFER_SHOP: 'transfer_token',
  PROVE_TOKEN_WAIT: 'prove_token_wait',
  //PROVE_TOKEN: 'prove_token'
  TRANSFER_DELIVER_WAIT: 'transfer_deliver_wait',
  TRANSFER_DELIVER_FINISH: 'transfer_deliver_finish',

  GENERATE_PASS_WAITING: 'generate_pass_waiting',
  GENERATE_PASS_FINISHED: 'generate_pass_finished',

  PASS_WAITING: 'pass_waiting',
  PASS_FINISHED: 'pass_success',

  ADD_HASH_FINISHED: 'confirm_finished',
  TOKEN_DESTROYED: 'token_destroyed',
}

const wss = new WebSocket.Server({ port: 1337 });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
  if (client.readyState === WebSocket.OPEN) {
    client.send(data);
  }
});
};

wss.on('connection', ws => {

  ws.on('message', async (message) => {
    switch (message.type) {
      case messageType.user.ISSUE:
        wss.broadcast({
          receiver: receiverGroup.ALL,
          type: messageType.ISSUE_WAIT,
        });
        await issueTokenCall();
        wss.broadcast({
          receiver: receiverGroup.ALL,
          type: messageType.TRANSFER_SHOP,
        });
        await transferToAmazon();
        wss.broadcast({
          receiver: receiverGroup.ALL,
          type: messageType.PROVE_TOKEN_WAIT,
        })
        break;
      case messageType.shop.PROVE_TOKEN:
        await validateToken();
        wss.broadcast({
          receiver: receiverGroup.ALL,
          type: messageType.TRANSFER_DELIVER_WAIT,
        })
        await transferTokenToDeliver()
        wss.broadcast({
          receiver: receiverGroup.ALL,
          type: messageType.TRANSFER_DELIVER_WAIT,
        })
        break;
      case messageType.deliver.GENERATE_PASS:
        wss.broadcast({
          receiver: receiverGroup.ALL,
          type: messageType.GENERATE_PASS_WAITING,
        })
        const link = await createLinkCall();
        wss.broadcast({
          receiver: receiverGroup.ALL,
          type: messageType.GENERATE_PASS_FINISHED,
          data: link,
        })
        break;
      case messageType.deliver.PASS_REQUEST:
        wss.broadcast({
          receiver: receiverGroup.ALL,
          type: messageType.PASS_WAITING,
        })
        const result = await everiPassCall(message.data)
        wss.broadcast({
          receiver: receiverGroup.ALL,
          type: messageType.PASS_FINISHED,
          data: result
        })
        break;
      case messageType.deliver.LEAVE_ROOM:
        wss.broadcast({
          receiver: receiverGroup.USER,
          type: messageType.LEAVE_ROOM,
        })
        break;
      case messageType.user.CONFIRM:
        await addVideoData()
        wss.broadcast({
          receiver: receiverGroup.ALL,
          type: messageType.CONFIRM_FINISHED,
        })
        await destroyTokenCall()
        const history = await checkData();
        wss.broadcast({
          receiver: receiverGroup.ALL,
          type: messageType.TOKEN_DESTROYED,
          data: history
        })
        break;
      default:
        console.log('unknown message', message);
        return;
    }
    console.log(`Received message => ${message}`)
  })
})

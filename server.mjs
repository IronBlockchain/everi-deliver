import WebSocket from 'ws'
// import api from './src/utils/api';
import {issueTokenCall, transferToAmazon, destroyTokenCall, validateToken, transferTokenToDeliver,
  createLinkCall, everiPassCall, addVideoData, checkData, init, test} from './src/utils/api.mjs';

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
    CONFIRM: 'confirm',
    CANCEL: 'user_cancel'
  },
  shop: {
    PROVE_TOKEN: 'prove_token',
  },
  deliver: {
    INIT_REQUEST: 'init_request',
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

  ADD_HASH_START: 'add_hash_start',
  ADD_HASH_FINISHED: 'confirm_finished',
  TOKEN_DESTROYED: 'token_destroyed',
}

const wss = new WebSocket.Server({ port: 1337 })

console.log('server started');

wss.broadcast = (data) => {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

wss.on('connection', async ws => {

  // await timeout(1000); // for test reason
  // wss.broadcast({
  //   receiver: receiverGroup.ALL,
  //   type: messageType.deliver.INIT_REQUEST
  // });

  ws.on('message', async (rawMessage) => {
    console.log(rawMessage);
    const message = JSON.parse(rawMessage)
    switch (message.type) {
      case messageType.deliver.INIT_REQUEST:
        wss.broadcast({
          receiver: receiverGroup.ALL,
          type: messageType.deliver.INIT_REQUEST
        })
        break;
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
        // break;
      // case messageType.shop.PROVE_TOKEN:
        await timeout(3000); //here we mock the data center prove function
        await validateToken();
        wss.broadcast({
          receiver: receiverGroup.ALL,
          type: messageType.TRANSFER_DELIVER_WAIT,
        })
        await transferTokenToDeliver()
        wss.broadcast({
          receiver: receiverGroup.ALL,
          type: messageType.TRANSFER_DELIVER_FINISH,
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
      //   break;
      // case messageType.deliver.PASS_REQUEST:
        await timeout(10000)
      //   wss.broadcast({
      //     receiver: receiverGroup.ALL,
      //     type: messageType.PASS_WAITING,
      //   })
      //   const result = await everiPassCall(message.data)
      //   const result = await everiPassCall(link)
        wss.broadcast({
          receiver: receiverGroup.ALL,
          type: messageType.PASS_FINISHED,
        })
        break;
      case messageType.deliver.LEAVE_ROOM:
        wss.broadcast({
          receiver: receiverGroup.USER,
          type: messageType.LEAVE_ROOM,
        })
        break;
      case messageType.user.CONFIRM:
        wss.broadcast({
          receiver: receiverGroup.ALL,
          type: messageType.ADD_HASH_START,
        })
        const hash = await addVideoData()
        wss.broadcast({
          receiver: receiverGroup.ALL,
          type: messageType.ADD_HASH_FINISHED,
          hash: hash
        })
        await destroyTokenCall()
        const history = await checkData()
        timeout(2000)
        wss.broadcast({
          receiver: receiverGroup.ALL,
          type: messageType.TOKEN_DESTROYED,
          data: history,
        })

        break;
      default:
        console.log('unknown message', message);
        return;
    }
    console.log(`Received message => ${message.toString()}`)
  })
})

import EVT from 'evtjs'
import config from '../config'



const network = {
    host: 'testnet1.everitoken.io', // For everiToken Aurora 2.0
    port: 8888,                     // defaults to 8888
    protocol: 'http'               // the TestNet of everiToken uses http and the MainNet uses https
};

// get APICaller instance
const apiCaller = EVT({
    // keyProvider should be string of private key (aka. wit, can generate from everiSigner)
    // you can also pass a function that return that string (or even Promise<string> for a async function)
    endpoint: network,
    keyProvider: config.private
});

// call API

async function init () {
    let response = await apiCaller.getInfo();

    // const tokens = await apiCaller.getFungibleBalance(config.public);
    // console.log('token balances are', tokens)

    const version = response.evt_api_version

    console.log('result is', response, version, tokens)
    return response;
}

export default init;
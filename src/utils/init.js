import EVT from 'evtjs'
import config from '../config'
import {issueToken, transferToken, destoryToken, addMetaData, createLink, createLinkQR, everiPass} from "./transfer"
import _ from 'lodash'
import {createDomain} from "./domain"
import sha256 from 'sha256'


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

const apiCallerAmazon = EVT({
    endpoint: network,
    keyProvider: config.amazon.private,
    networkTimeout: config.timeout
})

let evtLink = EVT.EvtLink;
const tokenName = "room" + Date.now();

async function init () {

    let response = await apiCaller.getInfo();
    const version = response.evt_api_version
    // const domainCreateResult = await createDomain(EVT, apiCaller, config.public, config.domainName)
    // console.log(domainCreateResult);

    await issueTokenCall();

    await transferTokenCall(apiCaller, config.public, config.amazon.public);

    await addMetaDataCall(apiCallerAmazon, config.amazon.public, "transfer", "amazon_validated")

    await transferTokenCall(apiCallerAmazon, config.amazon.public, config.deliver.public);

    const link = await createLinkCall()

    await everiPassCall(link)

    await addMetaDataCall(apiCaller, config.public, "videoHash", sha256(Date.now()))

    await destroyTokenCall()

    const tokens = await apiCaller.getFungibleBalance(config.public);
    console.log('fungible balances are', tokens)

    let ownTokens = await apiCaller.getOwnedTokens(config.public)
    console.log('token balances are', ownTokens)

    console.log('result is', response, version)
    return response;
}



const issueTokenCall = async () => {
    const transactionId = await issueToken(EVT, apiCaller, config.public, config.domainName, tokenName)
    console.log('issue token result is', transactionId)
    return transactionId;
}

const transferTokenCall = async (caller, sender, receiver) => {
    const result = await transferToken(EVT, caller, sender, config.domainName, tokenName,
        receiver, "now message comes")
    console.log('transfer token result is', result)
    return result;
}

const destroyTokenCall = async () => {
    const result = await destoryToken(EVT, apiCaller, config.public, config.domainName, tokenName)
    console.log('destroy token result is', result)
    return result;
}

const addMetaDataCall = async (apiCaller, sender, key, value) => {
    const result = await addMetaData(EVT, apiCaller, sender, config.domainName, tokenName,
    key, value)
    console.log('add meta result is', result)
    return result;
}

const createLinkCall = async () => {
    const link = await createLink(EVT, config.amazon.private, config.domainName, tokenName)
    console.log('generate link  is', link)
    return link.rawText
}

const createLinkQRCall = async () => {
    const data = await createLink(EVT, config.amazon.public, config.domainName, tokenName)
    console.log('generate link  is', data)
    return data.url
}

const everiPassCall = async (link) => {
    const isValidate = await everiPass(EVT, apiCaller, config.public, link)
    console.log('validate result is', isValidate)
    return isValidate
}


export default init;
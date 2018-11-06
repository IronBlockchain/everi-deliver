import config from "../config"

export const transferToken = async (EVT, apiCaller, publicKey, domainName, tokenName, receiver, memo) => {
    return apiCaller.pushTransaction(
        { maxCharge: 10000, payer: publicKey },
        new EVT.EvtAction(config.actionName.TRANSFER, {
            "domain": domainName,
            "name": tokenName,
            "to": [receiver],
            "memo": memo,
        })
    );
}

export const issueToken = async (EVT, apiCaller, publicKey, domainName, tokenName) => {
    return await apiCaller.pushTransaction(
        { maxCharge: 10000, payer: publicKey },
        new EVT.EvtAction(config.actionName.ISSUE_TOKEN, {
            "domain": domainName,
            "names": [tokenName],
            "owner": [publicKey],
        })
    );
}

export const destoryToken = async (EVT, apiCaller, publicKey, domainName, tokenName) => {
    return await apiCaller.pushTransaction(
        { maxCharge: 10000, payer: publicKey },
        new EVT.EvtAction(config.actionName.DESTROY_TOKEN, {
            "domain": domainName,
            "name": tokenName,
        })
    );
}

export const addMetaData = async (EVT, apiCaller, publicKey, domainName, tokenName, key, value) => {
    return await apiCaller.pushTransaction(
        { maxCharge: 10000, payer: publicKey },
        new EVT.EvtAction(config.actionName.ADD_META, {
            key, value,
            "creator": "[A] " + publicKey
        }, domainName, tokenName)
    );
}

export const everiPass = async (EVT, apiCaller, publicKey,link) => {
    return await apiCaller.pushTransaction(
        { maxCharge: 10000, payer: publicKey },
        new EVT.EvtAction(config.actionName.EVERI_PASS, {
            link
        })
    );
}

export const createLinkQR = async (EVT, publicKey, domainName, tokenName) => {
    return await EVT.EvtLink.getEVTLinkQrImage(
        "everiPass",
        {
            keyProvider: [publicKey],
            domainName,
            tokenName,
            autoDestroying: true
        },
        {
            autoReload: true
        },
        // (err, res) => {
        //     if (err) {
        //         alert(e.message);
        //         return;
        //     }
        //     document.getElementById("pass").setAttribute("src", res.dataUrl);
        // }
    );
}

export const createLink = async (EVT, privateKey, domainName, tokenName) => {
    return await EVT.EvtLink.getEvtLinkForEveriPass({
        domainName,
        tokenName,
        autoDestroying: false,
        keyProvider: [privateKey]
    })
}
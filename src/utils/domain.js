import config from '../config'

export const createDomain = async (EVT, apiCaller, publicKey, domainName) => {
    return apiCaller.pushTransaction(
        { maxCharge: 10000, payer: publicKey },
        new EVT.EvtAction(config.actionName.NEW_DOMAIN, {
            "name": domainName,
            "creator": publicKey,
            "issue": {
                "name": "issue",
                "threshold": 1,
                "authorizers": [{
                    "ref": "[A] " + publicKey,
                    "weight": 1
                }]
            },
            "transfer": {
                "name": "transfer",
                "threshold": 1,//each one party could transfer it independently
                "authorizers": [{
                    "ref": "[A] " + config.amazon.public,
                    "weight": 1
                },{
                    "ref": "[A] " + config.public,
                    "weight": 1
                }]
            },
            "manage": {
                "name": "manage",
                "threshold": 1,
                "authorizers": [{
                    "ref": "[A] " + publicKey,
                    "weight": 1
                }]
            }
        })
    );
}

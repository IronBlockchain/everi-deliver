export default function(EVT) {
    const newPrivate = EVT.EvtKey.seedPrivateKey('longhashHackathon');
    const newPublic = EVT.EvtKey.privateToPublic(newPrivate);
    return {public: newPublic, private: newPrivate};
}
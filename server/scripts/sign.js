const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

async function getSignatureInfo(privateKey) {
    const message = "Hey, it's me."
    const [signature, recoveryBit] = await signMessage(message, privateKey);

    console.log("message:", message);
    console.log("signature:", signature.toString());
}

async function signMessage(msg, privateKey) {
    return secp.sign(hashMessage(msg), privateKey, { recovered: true });
}

function hashMessage(msg) {
    const bytes = utf8ToBytes(msg);
    return keccak256(bytes);
}

module.exports = { getSignatureInfo, hashMessage };
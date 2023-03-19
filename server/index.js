const { hashMessage } = require("./scripts/sign");
const secp = require("ethereum-cryptography/secp256k1");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0xdac10aa1f4e19df723e0": 100,
  "0x59a6ba235444b5b9b091": 50,
  "0xffb937faa4afccee233f": 75,
};

const publicKeys = {
  "0xdac10aa1f4e19df723e0": "04163b6d07306e216a3d53b74524e1f423f50362562bfc72176ec8a96d296bb7db195dd98e4ef789e789839d614497fe9e52503624903cdac10aa1f4e19df723e0",
  "0x59a6ba235444b5b9b091": "047ac6a0ab0d74117a1a3ac725525e94e0f6e760d9cf9120eb0a59af7ad996966174d8839fecacdbbe0897151e802f3ae1a66b21b6e10559a6ba235444b5b9b091",
  "0xffb937faa4afccee233f": "04c56b0748ad6374a7153cc805c2e542d7ce10de73f9631bb1651f3a4d9e0294fb076d3586a359738076de42596e11144f32c2685362dcffb937faa4afccee233f",
};

// using query argument to reproduce the "login" process in a get request
// this is not a good practice but usefull in our case so we don't have to do much to reproduce a login process
// -> you can create new address and see their balance anymore (use the 3 given here or add manually others)
app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const { signature } = req.query;
  let balance = isOwner(address, signature) ? balances[address] : 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, digitalSignature } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (!isOwner(sender, digitalSignature)) {
    res.status(400).send({ message: "Your not the owner of the funds!" });
    return;
  }

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

function isOwner(address, digitalSignature) {
  const publicKey = publicKeys[address];
  const message = "Hey, it's me."
  const hash = hashMessage(message);
  // recreate the uint8array from string
  let digitalSignatureArray = digitalSignature.split(',').map(x => Number(x));
  let uint8Array = new Uint8Array(digitalSignatureArray.length);

  digitalSignatureArray.forEach((x, i) => uint8Array[i] = x);
  return secp.verify(uint8Array, hash, publicKey);
}

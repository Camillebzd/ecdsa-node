import server from "./server";

function Wallet({ address, setAddress, balance, setBalance, digitalSignature, setDigitalSignature }) {
  async function onChangeAddress(evt) {
    const address = evt.target.value;
    setAddress(address);
    if (address && digitalSignature) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}?signature=${digitalSignature}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  async function onChangeDS(evt) {
    const digitalSignature = evt.target.value;
    setDigitalSignature(digitalSignature);
    if (address && digitalSignature) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}?signature=${digitalSignature}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }


  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>
      <label>
        Wallet Address
        <input placeholder="Type an address, for example: 0x1" value={address} onChange={onChangeAddress}></input>
      </label>
      <label>
        Digital Signature
        <input placeholder="Use the script for signing a message then place the signature here" value={digitalSignature} onChange={onChangeDS}></input>
      </label>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;

import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [digitalSignature, setDigitalSignature] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        digitalSignature={digitalSignature}
        setDigitalSignature={setDigitalSignature}
        address={address}
        setAddress={setAddress}
      />
      <Transfer setBalance={setBalance} address={address} digitalSignature={digitalSignature} />
    </div>
  );
}

export default App;

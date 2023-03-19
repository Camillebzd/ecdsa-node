const { getSignatureInfo } = require("./sign");

const users = [
    {
        private_key:"7981e926afd4679990abad5a62932c1350c40c0218b81fd71744d55ac4e60dc5",
        public_key:"04163b6d07306e216a3d53b74524e1f423f50362562bfc72176ec8a96d296bb7db195dd98e4ef789e789839d614497fe9e52503624903cdac10aa1f4e19df723e0",
        address:"0xdac10aa1f4e19df723e0"
    },
    {
        private_key:"eb0b24840ceb99c9fdc3e1a72b28fb3ca49ae52e0ad27fdcaa146284b1a07a43",
        public_key:"047ac6a0ab0d74117a1a3ac725525e94e0f6e760d9cf9120eb0a59af7ad996966174d8839fecacdbbe0897151e802f3ae1a66b21b6e10559a6ba235444b5b9b091",
        address:"0x59a6ba235444b5b9b091"
    },
    {
        private_key:"24b80a11cd089d2d30c9d41396af8af2e6f3c5b2935fd0912813b5769d0ec2d0",
        public_key:"04c56b0748ad6374a7153cc805c2e542d7ce10de73f9631bb1651f3a4d9e0294fb076d3586a359738076de42596e11144f32c2685362dcffb937faa4afccee233f",
        address:"0xffb937faa4afccee233f"
    }
];

async function listUsers() {
    for (let i = 0; i < users.length; i++) {
        console.log(`\n############## ${i + 1} ##############`);
        console.log("private key:", users[i].private_key);
        console.log("public key:", users[i].public_key);
        console.log("address:", users[i].address);
        await getSignatureInfo(users[i].private_key);
        console.log("###############################");
    }
}

listUsers()
    .then(() =>process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
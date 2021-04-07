require("dotenv").config();
const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const lottery = require("./compile");
const ganache = require("ganache-cli");

const provider = new HDWalletProvider({
  mnemonic: process.env.WALLET_MNEMONIC,
  providerOrUrl: process.env.BCHAIN_CONN_PROVIDER,
});
const web3 = new Web3(provider);

(async () => {
  const accounts = await web3.eth.getAccounts();
  const sender = accounts[0];
  const contractInstance = await new web3.eth.Contract(lottery.abi)
    .deploy({
      data: "0x" + lottery.evm.bytecode.object,
    })
    .send({
      from: sender,
      gas: "1000000",
    })
    .on("sending", () => {
      console.log("Deploying contract");
      console.log("-----------------");
      console.log(JSON.stringify(lottery.abi));
    })
    .on("error", (err) => {
      console.log(err);
      provider.engine.stop();
      return;
    });
  console.log("Contract deployed");
  console.log("-----------------");
  console.log(`Contract addr: ${contractInstance.options.address}`);
  console.log(`From: ${sender}`);
  provider.engine.stop();
})();

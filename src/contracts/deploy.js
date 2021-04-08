require("dotenv").config();
const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const lottery = require("./compile");
const path = require("path");
const fs = require("fs");

const provider = new HDWalletProvider({
  mnemonic: process.env.WALLET_MNEMONIC,
  providerOrUrl: process.env.BCHAIN_CONN_PROVIDER,
});
const web3 = new Web3(provider);

(async () => {
  const accounts = await web3.eth.getAccounts();
  const sender = accounts[0];
  const result = await new web3.eth.Contract(lottery.abi)
    .deploy({
      data: "0x" + lottery.evm.bytecode.object,
    })
    .send({
      from: sender,
      gas: "1000000",
    })
    .on("sending", () => {
      console.log("Deploying contract...");
    })
    .catch((err) => {
      console.log(err);
    });

  if (!result) return;

  const outContent =
    "\nREACT_APP_CONTRACT_ABI = " +
    JSON.stringify(lottery.abi) +
    "\nREACT_APP_CONTRACT_ADDR = " +
    result.options.address;
  const outPath = path.resolve(__dirname, "..", "..", ".env");

  fs.writeFileSync(outPath, outContent, { encoding: "utf8", flag: "a" });
  console.log(`Wrote deployment data to ${outPath}`);

  provider.engine.stop();
})();

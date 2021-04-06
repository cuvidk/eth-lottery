const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const compiledContract = require("../src/compile");

let accounts;
let lottery;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  lottery = await new web3.eth.Contract(compiledContract.abi)
    .deploy({
      data: "0x" + compiledContract.evm.bytecode.object,
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Lottery contract", () => {
  it("can deploy the contract", () => {
    assert(lottery);
  });

  it("allows player to join", async () => {
    let players = await lottery.methods.getPlayers().call();
    assert.strictEqual(players.length, 0);

    await lottery.methods
      .join()
      .send({ from: accounts[0], value: web3.utils.toWei("0.01", "ether") });

    players = await lottery.methods.getPlayers().call();
    assert.strictEqual(players.length, 1);
    assert.strictEqual(players[0], accounts[0]);
  });
});

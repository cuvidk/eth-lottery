import web3 from "./web3";

const abi = JSON.parse(
  '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor","signature":"constructor"},{"inputs":[],"name":"getPlayers","outputs":[{"internalType":"address payable[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x8b5b9ccc"},{"inputs":[],"name":"join","outputs":[],"stateMutability":"payable","type":"function","payable":true,"signature":"0xb688a363"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true,"signature":"0x8da5cb5b"},{"inputs":[],"name":"pickWinner","outputs":[],"stateMutability":"nonpayable","type":"function","signature":"0x5d495aea"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"players","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xf71d96cb"},{"inputs":[],"name":"winner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true,"signature":"0xdfbf53ae"}]'
);
const contractAddr = "0xDcF9ad1667f043230B704F3f394d18323CB3599A";
const contractInstance = new web3.eth.Contract(abi, contractAddr);

export default contractInstance;

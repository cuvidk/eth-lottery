import web3 from "./web3";

if (
  !process.env.REACT_APP_CONTRACT_ABI ||
  !process.env.REACT_APP_CONTRACT_ADDR
) {
  throw "Unable to find REACT_APP_CONTRACT_ABI / REACT_APP_CONTRACT_ADDR. Provide them in a .env file";
}

const lottery = new web3.eth.Contract(
  JSON.parse(process.env.REACT_APP_CONTRACT_ABI),
  process.env.REACT_APP_CONTRACT_ADDR
);

export default lottery;

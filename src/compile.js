const fs = require("fs");
const path = require("path");
const solc = require("solc");

const CONTRACT_NAME = "lottery.sol";
const srcPath = path.resolve(__dirname, "contracts", CONTRACT_NAME);
const srcContent = fs.readFileSync(srcPath, { encoding: "utf8" });

const input = {
  language: "Solidity",
  sources: {
    "lottery.sol": {
      content: srcContent,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

module.exports = output.contracts[CONTRACT_NAME].Lottery;

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract Lottery {
  address public owner;
  address payable [] public players;
  address payable public winner;
  uint public lastPrize;

  constructor() {
    owner = msg.sender;
  }

  function join() public payable {
    require(msg.value == 0.01 ether, "To join, 0.01 ether is required.");
    for (uint i = 0; i < players.length; ++i) {
      require(players[i] != msg.sender, "Player already joined");
    }
    players.push(payable(msg.sender));
  }

  function getPlayers() public view returns(address payable[] memory) {
    return players;
  }

  modifier ownerOnly() {
    require(msg.sender == owner, "Only the owner of the contract can execute this operation");
    _;
  }

  function pickWinner() public ownerOnly {
    winner = players[random() % players.length];
    lastPrize = address(this).balance;
    winner.transfer(address(this).balance);
    players = new address payable [](0);
  }

  function random() private view returns(uint) {
    return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
  }
}
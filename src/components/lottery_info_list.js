import React from "react";
import LotteryInfoListItem from "./lottery_info_list_item";
import web3 from "../web3";
import lottery from "../lottery";

class LotteryInfoList extends React.Component {
  state = {
    lastWinner: "",
    lastPrizePool: "",
    registeredPlayers: "",
    prizePool: "",
    contractAddress: "",
    contractOwner: "",
    fetching: false,
  };

  componentDidMount() {
    this.fetchLotteryInfo();
  }

  async fetchLotteryInfo() {
    const lastWinner = await lottery.methods.winner().call();
    const lastPrizePool = "0";
    const registeredPlayers = (await lottery.methods.getPlayers().call())
      .length;
    const prizePool = await web3.eth.getBalance(lottery.options.address);
    const contractAddress = lottery.options.address;
    const contractOwner = await lottery.methods.owner().call();

    this.setState({
      lastWinner,
      lastPrizePool,
      registeredPlayers,
      prizePool,
      contractAddress,
      contractOwner,
    });
  }

  render() {
    const prize =
      this.state.prizePool === ""
        ? ""
        : web3.utils.fromWei(this.state.prizePool, "ether") + " ethers";
    const lastPrize =
      this.state.lastPrizePool === ""
        ? ""
        : web3.utils.fromWei(this.state.lastPrizePool, "ether") + " ethers";
    return (
      <div className="container-fluid">
        <LotteryInfoListItem
          name="Registered players"
          value={this.state.registeredPlayers}
        />
        <LotteryInfoListItem name="Prize pool" value={prize} />
        <LotteryInfoListItem name="Last prize pool" value={lastPrize} />
        <LotteryInfoListItem name="Last winner" value={this.state.lastWinner} />
        <LotteryInfoListItem
          name="Contract addr"
          value={this.state.contractAddress}
        />
        <LotteryInfoListItem
          name="Contract owner"
          value={this.state.contractOwner}
        />
      </div>
    );
  }
}

export default LotteryInfoList;

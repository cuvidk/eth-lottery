import React from "react";
import ReactDOM from "react-dom";
import LotteryInfoList from "./components/lottery_info_list";
import lottery from "./lottery";
import web3 from "./web3";

class App extends React.Component {
  state = {
    lastWinner: "...",
    lastPrizePool: "...",
    registeredPlayers: "...",
    prizePool: "...",
    contractAddress: "...",
    contractOwner: "...",
  };

  componentDidMount() {
    this.updateLotteryInfo();
  }

  async updateLotteryInfo() {
    const lastWinner = await lottery.methods.winner().call();
    const lastPrizePool = 0;
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
    return (
      <React.StrictMode>
        <div className="jumbotron bg-dark text-white text-center p-3">
          <h1>Ether lottery, wanna join?</h1>
        </div>
        <LotteryInfoList
          lastWinner={this.state.lastWinner}
          lastPrizePool={this.state.lastPrizePool}
          registeredPlayers={this.state.registeredPlayers}
          prizePool={this.state.prizePool}
          contractAddress={this.state.contractAddress}
          contractOwner={this.state.contractOwner}
        />
        <div className="d-grid col-4 mx-auto">
          <button type="button" className="btn-lg btn-dark">
            Join
          </button>
        </div>
      </React.StrictMode>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));

import React from "react";
import ReactDOM from "react-dom";
import LotteryInfoList from "./components/lottery_info_list";

class App extends React.Component {
  render() {
    return (
      <React.StrictMode>
        <div className="jumbotron bg-dark text-white text-center p-3">
          <h1>Ether lottery, wanna join?</h1>
        </div>
        <LotteryInfoList
          lastWinner={"0x0"}
          lastPrizePool={"12312 ethers"}
          registeredPlayers={"many"}
          prizePool={"2123123 ethers"}
          contractAddress={"0x0"}
          contractOwner={"0x0"}
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

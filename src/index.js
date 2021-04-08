import React from "react";
import ReactDOM from "react-dom";
import LotteryInfoList from "./components/lottery_info_list";
import lottery from "./lottery";
import web3 from "./web3";

class App extends React.Component {
  state = {
    joined: false,
    joining: false,
  };

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    const players = await lottery.methods.getPlayers().call();
    players.forEach((player) => {
      if (accounts[0] === player) {
        this.setState({ joined: true });
      }
    });
  }

  handleJoin = async () => {
    const accounts = await web3.eth.getAccounts();
    if (!accounts.length) {
      return;
    }

    const result = await lottery.methods
      .join()
      .send({
        from: accounts[0],
        value: web3.utils.toWei("0.01", "ether"),
      })
      .on("sending", () => {
        this.setState({ joining: true });
      })
      .catch((err) => {
        //TODO: render me somewhere
        console.log("error occured:" + err);
      });

    result
      ? this.setState({ joining: false, joined: true })
      : this.setState({ joining: false });
  };

  render() {
    return (
      <React.StrictMode>
        <div className="jumbotron bg-dark text-white text-center p-3">
          <h1>Ether lottery, wanna join?</h1>
        </div>
        <LotteryInfoList />
        <div className="d-grid col-4 mx-auto">
          <button
            type="button"
            className="btn-lg btn-dark"
            onClick={this.handleJoin}
            disabled={this.state.joined}
          >
            <span
              className={`spinner-border spinner-border-sm ${
                this.state.joining ? "" : "visually-hidden"
              }`}
              role="status"
              aria-hidden="true"
            ></span>
            {this.state.joined
              ? "Already joined"
              : this.state.joining
              ? ""
              : "Join"}
          </button>
        </div>
      </React.StrictMode>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));

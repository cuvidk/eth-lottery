import React from "react";
import ReactDOM from "react-dom";
import LotteryInfoList from "./components/lottery_info_list";
import lottery from "./lottery";
import web3 from "./web3";

class App extends React.Component {
  state = {
    joined: false,
    loading: false,
    account: "",
    isOwner: false,
  };

  async componentDidMount() {
    const owner = await lottery.methods.owner().call();
    const accounts = await web3.eth.getAccounts();
    const players = await lottery.methods.getPlayers().call();

    this.setState({
      joined: players.some((player) => player === accounts[0]),
      isOwner: owner === accounts[0],
      account: accounts[0],
    });
  }

  handleJoin = async () => {
    const result = await lottery.methods
      .join()
      .send({
        from: this.state.account,
        value: web3.utils.toWei("0.01", "ether"),
      })
      .on("sending", () => {
        this.setState({ loading: true });
      })
      .catch((err) => {
        //TODO: render me somewhere
        console.log("error occured:" + err);
      });

    result
      ? this.setState({ loading: false, joined: true })
      : this.setState({ loading: false });
  };

  handlePickWinner = async () => {
    await lottery.methods
      .pickWinner()
      .send({
        from: this.state.account,
        gas: "1000000",
      })
      .on("sending", () => {
        this.setState({ loading: true });
      })
      .catch((err) => {
        console.log(err);
      });

    this.setState({ loading: false });
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
            className="btn-lg btn-dark m-1"
            onClick={this.handleJoin}
            disabled={this.state.joined}
          >
            <span
              className={`spinner-border spinner-border-sm ${
                this.state.loading ? "" : "visually-hidden"
              }`}
              role="status"
              aria-hidden="true"
            ></span>
            {this.state.loading ? "" : this.state.joined ? "Joined" : "Join"}
          </button>
          <button
            type="button"
            className={`btn-lg btn-dark m-1 ${
              this.state.isOwner ? "" : "visually-hidden"
            }`}
            onClick={this.handlePickWinner}
            disabled={!this.state.isOwner}
          >
            <span
              className={`spinner-border spinner-border-sm ${
                this.state.loading ? "" : "visually-hidden"
              }`}
              role="status"
              aria-hidden="true"
            ></span>
            {this.state.loading ? "" : "Pick a winner"}
          </button>
        </div>
      </React.StrictMode>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));

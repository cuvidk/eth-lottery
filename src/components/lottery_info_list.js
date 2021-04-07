import React from "react";
import LotteryInfoListItem from "./lottery_info_list_item";

const LotteryInfoList = ({
  lastWinner,
  lastPrizePool,
  registeredPlayers,
  prizePool,
  contractAddress,
  contractOwner,
}) => {
  return (
    <div className="container">
      <LotteryInfoListItem
        name="Registered players"
        value={registeredPlayers}
      />
      <LotteryInfoListItem name="Prize pool" value={prizePool} />
      <LotteryInfoListItem name="Last prize pool" value={lastPrizePool} />
      <LotteryInfoListItem name="Last winner" value={lastWinner} />
      <LotteryInfoListItem name="Contract addr" value={contractAddress} />
      <LotteryInfoListItem name="Contract owner" value={contractOwner} />
    </div>
  );
};

export default LotteryInfoList;

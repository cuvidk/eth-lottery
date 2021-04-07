import React from "react";

const style = {
  backgroundColor: "#bbbbbb",
};

const LotteryInfoListItem = ({ name, value }) => {
  return (
    <div className="row">
      <div className="col">
        <h3 className="text-end">{name}</h3>
      </div>
      <div className="col">
        <h3 className="text-start">{value}</h3>
      </div>
    </div>
  );
};

export default LotteryInfoListItem;

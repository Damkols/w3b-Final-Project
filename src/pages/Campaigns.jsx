import React from "react";
import AllCampaigns from "../components/AllCampaigns";
import goEth from "../abis/goEth.json";

const Campaigns = () => {
  const contractAddress = goEth.address;
  const abi = goEth.abi;
  return (
    <>
      <AllCampaigns contractAddress={contractAddress} abi={abi} />
    </>
  );
};

export default Campaigns;

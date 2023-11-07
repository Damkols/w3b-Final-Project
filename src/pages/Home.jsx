import React from "react";
import ActiveCampaigns from "../components/ActiveCampaigns";
import myAbi from "../../abi.json";

const Home = () => {
 return (
  <>
   <ActiveCampaigns contractAddress={myAbi.address} abi={myAbi.abi} />
  </>
 );
};

export default Home;

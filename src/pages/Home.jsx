import React from "react";
import AllCampaigns from "../components/AllCampaigns";
import myAbi from "../../abi.json";

//function contributeEth(uint _ID) external payable {
//function getContributedFunds(uint _ID) external {
//function getContributors(uint _ID) external view returns (Contributors[] memory _contributors) {

//function createGofundme(string memory _title, uint256 _fundingGoal, uint256 _durationTime, string memory imageUrl) public returns (uint _id) {
//function vote(uint _id, Votes votes) external {
//function approveProposal(uint _id) external {

const Home = () => {
 return (
  <>
   <AllCampaigns contractAddress={myAbi.address} abi={myAbi.abi} />
  </>
 );
};

export default Home;

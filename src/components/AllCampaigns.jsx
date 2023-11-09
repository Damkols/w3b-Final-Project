import React, { useEffect, useState } from "react";
import Card from "./CardData";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { Toaster, toast } from "react-hot-toast";
import CreateProposal from "./CreateProposal";
import { ethers } from "ethers";
import FundCard from "./FundCard";
import { v4 as uuidv4 } from "uuid";

export default function AllCampaigns({ contractAddress, abi }) {
 const { contract } = useContract(contractAddress, abi);
 const address = useAddress();
 const [createCampaignModal, setCreateCampaignModal] = useState(false);
 const [campaignsData, setCampaignsData] = useState([]);
 const { data, isLoading, error } = useContractRead(contract, "getCampaigns");

 async function showModal() {
  if (address) {
   setCreateCampaignModal(true);
  } else {
   toast.error("Wallet not connected");
  }
 }

 async function closeModal() {
  setCreateCampaignModal(false);
 }

 async function getAllCampaigns() {
  // Filter for only active and ended
  const campaigns = data.map((campaign) => {
   return {
    id: campaign.campaignId.toNumber(),
    title: campaign.campaignTitle,
    description: campaign.campaignDescription,
    image: campaign.campaignImageCID,
    target: ethers.utils.formatEther(campaign.targetAmount),
    raised: ethers.utils.formatEther(campaign.raisedAmount),
    endAt: new Date(campaign.endAt.toNumber() * 1000),
    status: campaign.status,
    owner: campaign.campaignOwner,
   };
  });
  const today = new Date();
  const activeCampaigns = campaigns.filter(
   (campaign) => campaign.status === true && campaign.endAt > today
  );
  setCampaignsData(activeCampaigns);
  console.log(activeCampaigns);
 }
 useEffect(() => {
  getAllCampaigns();
 }, [data]);

 return (
  <>
   <Toaster />
   <div className="mt-10 md:mt-20 md:text-left text-center">
    <h1 className="md:text-4xl md:font-semibold text-white text-xl md:p-0 py-5">
     All Campaigns
    </h1>
    <div className="grid md:grid-cols-3 gap-10 pt-4 justify-center items-cente">
     {campaignsData.map((data) => (
      <FundCard
       key={uuidv4()}
       data={data}
       contractAddress={contractAddress}
       abi={abi}
      />
     ))}
    </div>
   </div>
  </>
 );
}

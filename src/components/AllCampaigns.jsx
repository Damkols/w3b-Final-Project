import React, { useEffect, useState } from "react";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { Toaster, toast } from "react-hot-toast";
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
        id: campaign.id_.toNumber(),
        title: campaign.title,
        description: campaign.description,
        image: campaign.tokenUri,
        target: ethers.utils.formatEther(campaign.fundingGoal),
        raised: ethers.utils.formatEther(campaign.fundingBalance),
        endAt: new Date(campaign.durationTime.toNumber() * 1000),
        status: campaign.isActive,
        owner: campaign.owner,
      };
    });
    const today = new Date();
    const activeCampaigns = campaigns.filter(
      (campaign) => campaign.status === true
    );
    setCampaignsData(activeCampaigns);
    console.log(activeCampaigns);
  }
  useEffect(() => {
    getAllCampaigns();
  }, [data]);

  console.log(campaignsData);

  const reversedcampaignsData = [...campaignsData].reverse();

  return (
    <>
      <Toaster />
      <div className="mt-10 md:mt-20 md:text-left text-center">
        <h1 className="md:text-4xl md:font-semibold text-[#1c1c24] dark:text-white text-xl md:p-0 py-5">
          All Campaigns
        </h1>
        <div className="grid md:grid-cols-3 gap-10 pt-4 justify-center items-center">
          {reversedcampaignsData.map((data) => (
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

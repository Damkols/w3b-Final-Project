import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Card from "./CardData";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { Toaster, toast } from "react-hot-toast";
// import CreateCampaign from "./CreateCampaign";
import { ethers } from "ethers";
import FundCard from "./FundCard";
import myAbi from "../../abi.json";
import CreateCampaign from "./CreateCampaign";
import ProposalCard from "./ProposalCard";

const Proposals = () => {
 const contractAddress = myAbi.address;
 const abi = myAbi.abi;
 const { contract } = useContract(contractAddress, abi);
 const address = useAddress();
 const [createProposalModal, setCreateProposalModal] = useState(false);
 const [proposalData, setProposalData] = useState([]);
 const { data, isLoading, error } = useContractRead(contract, "getCampaigns");

 async function showModal() {
  if (address) {
   setCreateProposalModal(true);
  } else {
   toast.error("Wallet not connected");
  }
 }

 async function closeModal() {
  setCreateProposalModal(false);
 }

 async function getAllProposals() {
  // Filter for only active and ended
  const proposals = data.map((proposal) => {
   return {
    id: proposal.campaignId.toNumber(),
    title: proposal.campaignTitle,
    description: proposal.campaignDescription,
    image: proposal.campaignImageCID,
    target: ethers.utils.formatEther(proposal.targetAmount),
    raised: ethers.utils.formatEther(proposal.raisedAmount),
    endAt: new Date(proposal.endAt.toNumber() * 1000),
    status: proposal.status,
    owner: proposal.campaignOwner,
   };
  });
  const today = new Date();
  const activeProposals = proposals.filter(
   (proposal) => proposal.status === true && proposal.endAt > today
  );
  setProposalData(activeProposals);
  console.log(activeProposals);
 }
 useEffect(() => {
  getAllProposals();
 }, [data]);

 return (
  <>
   <Toaster />
   <div className="mt-20 md:text-left text-center">
    <div className="flex md:w-full md:justify-between justify-space-between mx-auto flex-wrap-reverse w-1/2">
     <h1 className="md:text-4xl md:font-semibold text-white text-xl md:p-0 py-5">
      Active Proposals:
     </h1>
     <button className="relative md:mx-20 rounded-xl border-4 overflow-hidden group p-2 text-green-500 font-semibold hover:text-white">
      <div className="absolute w-full h-full  bg-green-500 left-0 top-0 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
      <div className="absolute w-full h-full  bg-green-500 left-0 top-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
      <div className="absolute w-full h-full  bg-green-500 left-0 top-0 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
      <div className="absolute w-full h-full   bg-green-500 left-0 top-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
      <span className="relative z-10" onClick={showModal}>
       Create Proposal
      </span>
     </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-4">
     {proposalData.map((data) => (
      <ProposalCard
       key={uuidv4()}
       data={data}
       contractAddress={contractAddress}
       abi={abi}
      />
     ))}
    </div>
   </div>
   {createProposalModal && (
    <CreateCampaign
     showModal={showModal}
     closeModal={closeModal}
     contractAddress={contractAddress}
     abi={abi}
    />
   )}
  </>
 );
};

export default Proposals;

import {
 useAddress,
 useContract,
 useContractRead,
 useContractWrite,
} from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import myAbi from "../../abi.json";
import VoteModal from "./VoteModal";
import CustomButton from "./CustomButton";

const ProposalDetails = () => {
 const navigate = useNavigate();
 const { contract } = useContract(myAbi.address, myAbi.abi);

 const { state } = useLocation();
 const {
  campaignId,
  owner,
  title,
  description,
  image,
  target,
  raised,
  status,
  endAt,
 } = state;
 const date = new Date(endAt * 1000).toLocaleDateString();
 const gatewayUrl = `https://ipfs.io/ipfs/${image.split("//")[1]}`;
 const address = useAddress();
 const [voteModal, setVoteModal] = useState(false);
 const {
  data: daoMembers,
  isLoading,
  isError,
 } = useContractRead(contract, "getDaoMembers");

 const { mutateAsync: contributeCall } = useContractWrite(
  contract,
  "approveProposal"
 );

 async function voteForProposal() {
  if (!address) {
   toast.error("Connect Wallet to Contribute to a campaign");
  } else {
   setVoteModal(true);
  }
 }

 return (
  <>
   {/* <div className="flex flex-col justify-center items-center bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]"> */}
   <div className="flex flex-col justify-center items-center gap-3 p-4 md:p-5">
    <img
     className="w-3/4 h-2/4 rounded-t-xl"
     src={gatewayUrl}
     alt="Image Description"
    />
    <div className="flex flex-col justify-center items-center gap-3 p-4 md:p-5">
     <h3 className="text-lg font-bold text-gray-800 dark:text-white">
      {title}
     </h3>
     <p className="mt-1 text-gray-500 dark:text-gray-400">{description}</p>

     <button
      className="bg-green-300 text-black p-3 rounded-lg font-semibold hover:bg-purple-900 hover:text-white"
      onClick={voteForProposal}
     >
      Cast your Vote
     </button>
     <VoteModal
      open={voteModal}
      onClose={() => setVoteModal(false)}
      campaignTitle={title}
      owner={owner}
      campaignId={campaignId}
      contractAddress={myAbi.address}
      abi={myAbi.abi}
     />

     <CustomButton
      btnType="button"
      title="Back"
      handleClick={() => navigate(-1)}
     />

     {daoMembers.includes(address) ? (
      <CustomButton
       btnType="button"
       title="Vote on proposal"
       styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
       handleClick={async () => {
        toast.loading("Approving Proposal...", {
         id: 2,
        });
        try {
         console.log(campaignId);
         await mutateAsync({
          args: [campaignId],
         });
         toast.success("Proposal Approved successfully!", {
          id: 2,
         });
         navigate("/");
        } catch (error) {
         toast.error("Error approving proposal.", {
          id: 2,
         });
         console.error(error);
        }
        closeModal();
       }}
      />
     ) : (
      <p>Not a DAO member</p>
     )}
    </div>
   </div>
  </>
 );
};

export default ProposalDetails;

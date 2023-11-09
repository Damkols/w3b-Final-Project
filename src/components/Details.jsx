import {
 useAddress,
 useContract,
 useContractRead,
 useContractWrite,
} from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { PiMaskSadLight } from "react-icons/pi";
import Contribute from "./ContributionModal";
import { ethers } from "ethers";
import myAbi from "../../abi.json";
import { shortenAccount } from "../utils";
import goEth from "../abis/goEth.json";

export default function Details() {
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
 const [contribution, setContribution] = useState([]);
 const [contributionModal, setContributionModal] = useState(false);
 const [deleteModal, setDeleteModal] = useState(false);
 const [editModal, setEditModal] = useState(false);
 const {
  data: contributions,
  isLoading,
  isError,
 } = useContractRead(contract, "getAllContributionsForParticularCampaign", [
  campaignId,
 ]);

 async function getAllContributions() {
  if (contributions) {
   const filter = contributions.map((data) => {
    return {
     id: data.contributionId.toNumber(),
     amount: ethers.utils.formatEther(data.amount),
     contributor: data.contributor.toString(),
     date: data.date.toNumber() * 1000,
    };
   });
   setContribution(filter);
  }
 }
 const { mutateAsync: contributeCall } = useContractWrite(
  contract,
  "claimContribution"
 );
 //  async function editFunction() {
 //   if (!address) {
 //    toast.error("Connect Wallet to delete");
 //    return;
 //   }
 //   setEditModal(true);
 //  }

 //  async function deleteFunction() {
 //   if (!address) {
 //    toast.error("Connect Wallet to delete");
 //    return;
 //   }
 //   setDeleteModal(true);
 //  }
 console.log(contribution);

 useEffect(() => {
  getAllContributions();
 }, [contributions]);

 async function contributeToCampaign() {
  if (!address) {
   toast.error("Connect Wallet to Contribute to a campaign");
  } else {
   setContributionModal(true);
  }
 }
 const connectToSepoliaTestnet = async () => {
  const desiredChainId = "0xAA36A7"; // Chain ID 11155111 in hexadecimal
  if (address) {
   if (window.ethereum) {
    const chainId = await window.ethereum.request({
     method: "eth_chainId",
    });

    // Check if connected to a different network (not Sepolia testnet)
    if (chainId !== desiredChainId) {
     // ChainId of Sepolia testnet is '0xAA36A7'
     try {
      await window.ethereum.request({
       method: "wallet_switchEthereumChain",
       params: [{ chainId: desiredChainId }],
      });
     } catch (error) {
      // Handle error
      console.log("Error while switching to zkEVM testnet:", error);
     }
    }
   } else {
    // Handle case where window.ethereum is not available
    console.log("Metamask not available");
   }
  }
 };
 useEffect(() => {
  connectToSepoliaTestnet();
 }, [address]);
 console.log(raised);
 return (
  <>
   <Toaster />
   <div className="my-10 text-3xl font-bold text-center mb-12 text-white">
    Details Page
   </div>
   <div className="flex flex-wrap w-5/6  mx-auto p-0 md:pl-20">
    <div className="md:w-1/2 w-full">
     <img
      src={gatewayUrl}
      className="md:w-4/5 rounded-2xl min-w-full md:min-w-0"
     />
    </div>

    <div className="flex flex-col md:w-80 w-full justify-between text-center md:text-left mt-10 md:m-0 text-white">
     <div className="md:h-1/2 h-2/3 border-b-8 border-green-400 flex flex-col justify-around">
      <h2 className="text-3xl font-bold mb-5">
       {title}
       {address == owner && <></>}
      </h2>

      <p className="mb-4 text-xl pb-5">{description}</p>
     </div>
     <div className="flex flex-col justify-around md:h-1/2 text-xl font-semibold mt-8">
      <div>
       Created By :{" "}
       <a
        className="underline italic font-semibold"
        href={`https://sepolia.etherscan.io/address/${owner}`}
        target="_blank"
        rel="noreferrer"
       >
        {/* {owner.slice(0, 15)}...{owner.slice(32)} */}
        {shortenAccount(owner)}
       </a>
      </div>
      <div>Target : {target} ETH</div>
      <div>Raised {raised} ETH</div>
      <div>Ends on : {date}</div>
     </div>
    </div>
   </div>
   <div className="my-14 flex md:justify-end justify-center md:w-4/5 w-full">
    {address == owner && (
     <button
      className="bg-white text-red-600 hover:bg-red-500 hover:text-white  p-3 mx-5 rounded-lg font-semibold"
      onClick={async () => {
       //    if (raised < target) {
       //     toast.error("Target not reached");
       //     return;
       //    }

       toast.loading("Claiming Contribution", {
        id: 2,
       });
       try {
        await contributeCall({
         args: [campaignId],
        });
        toast.success("Claimed Succesfully", {
         id: 2,
        });

        setTimeout(() => {
         navigate("/");
        }, 5000);
       } catch (error) {
        toast.error("Error Claiming campaign.", {
         id: 2,
        });
        console.error(error);
       }
      }}
     >
      Claim Contribution
     </button>
    )}
    <button
     className="bg-green-300 text-black p-3 rounded-lg font-semibold hover:bg-purple-900 hover:text-white"
     onClick={contributeToCampaign}
    >
     Contribute to this Campaign
    </button>
    <Contribute
     open={contributionModal}
     onClose={() => setContributionModal(false)}
     campaignTitle={title}
     owner={owner}
     campaignId={campaignId}
     contractAddress={myAbi.address}
     abi={myAbi.abi}
    />
   </div>
   {contribution.length > 0 && (
    <div className="overflow-x-auto sm:overflow-x-visible w-4/5 mx-auto mt-20">
     <table className="w-full md:text-sm text-left text-gray-500 text-xs">
      <thead className="text-xs text-white uppercase bg-gray-800">
       <tr>
        <th scope="col" className="md:px-6 px-2 py-3">
         Wallet Address
        </th>
        <th scope="col" className="md:px-6 px-2 py-3">
         Amount
        </th>
        <th scope="col" className="md:px-6 px-2 py-3">
         Date
        </th>
       </tr>
      </thead>
      <tbody className="max-h-96 h-10 overflow-y-auto">
       {contribution.map((contri) => (
        <tr key={contri.id} className="">
         <td className="md:px-6 px-2 py-3">{contri.contributor}</td>
         <td className="md:pl-7 px-2 py-3">{contri.amount} ETH</td>
         <td className="md:px-6 px-2 py-3">
          {new Date(contri.date).toLocaleDateString()}
         </td>
        </tr>
       ))}
      </tbody>
     </table>
    </div>
   )}
   {contribution.length == 0 && (
    <div className="my-10 text-center text-green-500 text-3xl font-bold flex justify-center">
     <PiMaskSadLight /> No contributions made yet <PiMaskSadLight />
    </div>
   )}
  </>
 );
}

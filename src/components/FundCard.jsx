import React, { useState } from "react";
import Details from "./Details";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import { ethers } from "ethers";
import { Toaster, toast } from "react-hot-toast";
import { useAddress } from "@thirdweb-dev/react";
import Contribute from "./ContributionModal";
import { shortenAccount } from "../utils";

const FundCard = ({ data, contractAddress, abi }) => {
 const address = useAddress();
 const [contributeModal, setContributeModal] = useState(false);
 async function handleContribute() {
  if (address) {
   setContributeModal(true);
  } else {
   toast.error("Connect Wallet to Contribute");
  }
 }
 const navigate = useNavigate();
 const url = data.image;
 const raisedPercent = data.raised / data.target;
 const detailsParams = data.id + data.title + data.owner;
 const hash = ethers.utils
  .keccak256(ethers.utils.toUtf8Bytes(detailsParams))
  .split("0x")[1]
  .slice(0, 8);

 const gatewayUrl = `https://ipfs.io/ipfs/${url.split("//")[1]}`;
 const dateInSeconds = Math.floor(new Date(data.endAt).getTime() / 1000);

 console.log(data);

 return (
  <div
   className="w-[288px] md:w-full rounded-[15px] bg-[#1c1c24] cursor-pointer"
   onClick={() =>
    navigate(`/details/${hash}`, {
     state: {
      campaignId: data.id,
      title: data.title,
      description: data.description,
      image: data.image,
      target: data.target,
      raised: data.raised,
      endAt: dateInSeconds,
      status: data.status,
      owner: data.owner,
     },
    })
   }
  >
   <img
    src={gatewayUrl}
    alt="fund"
    className="w-full h-[158px] object-cover rounded-[15px]"
   />

   <div className="flex flex-col p-6">
    <div className="flex flex-row items-center mb-[18px]">
     <img
      src={gatewayUrl}
      alt="tag"
      className="w-[17px] h-[17px] object-contain"
     />
     <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">
      Wildlife
     </p>
    </div>

    <div className="block">
     <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">
      {data.title.length > 17 ? data.title.slice(0, 17) + "..." : data.title}
     </h3>
     <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">
      {data.description.length > 50
       ? data.description.slice(0, 50) + "..."
       : data.description}
     </p>
    </div>

    <div className="flex justify-between flex-wrap mt-[15px] gap-2">
     <div className="flex flex-col">
      <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
       Amount collected {data.raised}
      </h4>
      <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
       Raised of target - {data.target}
      </p>
     </div>
     {/* <div className="flex flex-col">
      <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">
       remainingDays
      </h4>
      <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
       Days Left - {endAt}
      </p>
     </div> */}
    </div>

    <div className="flex items-center mt-[15px] gap-[12px]">
     <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
      <img src={gatewayUrl} alt="user" className="w-full object-contain" />
     </div>
     <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">
      by <span className="text-[#b2b3bd]">{shortenAccount(data.owner)}</span>
     </p>
    </div>

    <div className="w-full m-auto mb-3 mt-3">
     {raisedPercent * 100 > 0 ? (
      <ProgressBar
       bgColor="#1dc071"
       completed={raisedPercent * 100}
       animateOnRender={true}
      />
     ) : (
      <p className="text-center italic text-gray-300">**No Donations yet**</p>
     )}
    </div>
   </div>
  </div>
 );
};

export default FundCard;

import { Web3Button, useContract, useContractWrite } from "@thirdweb-dev/react";
import { utils } from "ethers";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import ConfettiExplosion from "react-confetti-explosion";
import { useNavigate } from "react-router-dom";
function VoteModal({
 open,
 onClose,
 campaignTitle,
 owner,
 campaignId,
 contractAddress,
 abi,
}) {
 const { contract } = useContract(contractAddress, abi);
 const navigate = useNavigate();
 const {
  mutateAsync: voteCall,
  isLoading,
  error,
 } = useContractWrite(contract, "vote");
 const [amount, setAmount] = useState("");
 const [confettiCelebration, setConfettiCelebration] = useState(false);

 const handleInput = (e) => {
  const value = e.target.value;

  if (value <= 0) {
   toast.error("Amount must be greater than 0");
   return;
  }

  setAmount(value);
 };

 if (!open) return null;

 return (
  <>
   <Toaster />
   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg p-6 max-w-sm">
     <h3 className="text-lg font-bold text-center mb-4 mt-0 pt-0">
      {campaignTitle}
     </h3>
     <p className="text-sm text-pink-500 text-center mb-4">
      Created by {owner}
     </p>
     <div className="flex gap-3">
      <Web3Button
       contractAddress={contractAddress}
       action={(contract) => contract.call("vote", { args: [campaignId, 0] })}
      >
       Yay
      </Web3Button>
      <Web3Button
       contractAddress={contractAddress}
       action={(contract) => contract.call("vote", { args: [campaignId, 1] })}
      >
       Nay
      </Web3Button>
     </div>
     <div className="flex justify-around pt-5">
      <button
       className="bg-red-500 text-white font-xl rounded-lg p-3 px-4"
       onClick={onClose}
      >
       Cancel
      </button>
      <button
       className="bg-purple-500 text-white font-xl rounded-lg p-3 px-4"
       onClick={async () => {
        toast.loading("Voting for proposal...", {
         id: 2,
        });
        try {
         await voteCall({
          args: [campaignId],
          //   overrides: {
          //    value: utils.parseEther(amount.toString()),
          //    gasLimit: 1000000, // override default gas limit
          //   },
         });
         toast.success("Voted Succesfully", {
          id: 2,
         });
         setConfettiCelebration(true);
         onClose();
         setAmount("");
         setTimeout(() => {
          // Code to run
          navigate("/");
         }, 5000);
        } catch (error) {
         toast.error("Error voting for proposal.", {
          id: 2,
         });
         console.error(error);
        }
       }}
      >
       Vote
      </button>
      {confettiCelebration && <ConfettiExplosion />}
     </div>
    </div>
   </div>
  </>
 );
}

export default VoteModal;

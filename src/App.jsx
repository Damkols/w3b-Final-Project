import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { useAddress } from "@thirdweb-dev/react";
import myAbi from "../abi.json";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Details from "./components/Details.jsx";
import Proposals from "./components/Proposals.jsx";
import Home from "./pages/Home.jsx";
import ProposalDetails from "./components/ProposalDetails.jsx";
import Campaigns from "./pages/Campaigns.jsx";

export default function App() {
  const address = useAddress();
  const desiredChainId = "0xAA36A7";

  const connectToSepoliaTestnet = async () => {
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
            console.log("Error while switching to Sepolia testnet:", error);
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
  }, [myAbi.address]);

  return (
    <BrowserRouter>
      <div className="relative sm:-8 p-4 bg-[#F5F5F5] dark:bg-[#13131a] min-h-screen flex flex-row">
        <div className="sm:flex hidden mr-10 relative">
          <Routes>
            <Route path="/:any/*" element={<Sidebar />} />
          </Routes>
        </div>
        <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
          {/* Display Navbar only when not on the landing page */}
          <Routes>
            <Route path="/:any/*" element={<Navbar />} />
          </Routes>

          {/* <Header /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details" element={<Campaigns />} />
            <Route path="/details/:id/*" element={<Details />} />
            <Route path="/proposals" element={<Proposals />} />
            <Route
              path="/proposal-details/:id/*"
              element={<ProposalDetails />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

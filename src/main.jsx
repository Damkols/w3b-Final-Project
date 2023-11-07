import React from "react";
import ReactDOM from "react-dom/client";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import App from "./App.jsx";
import "./index.css";

// const router = createBrowserRouter([
//  {
//   path: "/",
//   element: <App />,
//  },
//  {
//   path: "/details/:id",
//   element: <Details />,
//  },
//  {
//   path: "/proposals",
//   element: <Proposals />,
//  },
// ]);
const activeChain = {
 chainId: 11155111,
 rpc: ["https://sepolia.infura.io/v3/5b887901bcee46279c3803899a48c5a0"],

 nativeCurrency: {
  decimals: 18,
  name: "Ether",
  symbol: "ETH",
 },
 shortName: "Sepolia testnet",
 slug: "sepoliatest",
 testnet: true,
 chain: "Sepolia",
 name: "Sepolia Testnet",
};
// const clientId = process.env.REACT_APP_THIRDWEB_CLIENT_ID;
ReactDOM.createRoot(document.getElementById("root")).render(
 <React.StrictMode>
  <ThirdwebProvider
   activeChain={activeChain}
   clientId={"f0d9bfeee428cdd3ba34e13869e2fd12"}
   chainId={11155111}
   supportedChains={[activeChain]}
   autoConnect={false}
  >
   <App />
  </ThirdwebProvider>
 </React.StrictMode>
);

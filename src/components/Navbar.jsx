import React, { useState } from "react";
import { ConnectWallet } from "@thirdweb-dev/react";
import { Link, useNavigate } from "react-router-dom";
import { logo, menu, search, wlf } from "../assets";
import { navlinks } from "../constants";
import { useAddress } from "@thirdweb-dev/react";
import CustomButton from "./CustomButton";

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const address = useAddress();

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pr-2 h-[52px]">
        <h1 className="md:text-4xl md:font-semibold text-[#1c1c24] dark:text-white text-xl">
          Earth-Sustain
        </h1>
      </div>

      <div className="sm:flex hidden flex-row justify-end gap-4">
        {address && (
          <button
            onClick={() => {
              if (address) navigate("proposals");
              else connect();
            }}
            className="flex justify-center gap-2 items-center relative md:mx-3 rounded-xl border-2 overflow-hidden group py-2 px-4 font-semibold hover:text-white"
          >
            <div className="cursor-pointer inline-flex items-center gap-x-1 text-sm text-[#1c1c24] dark:text-white decoration-2 font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
              Create Proposal
            </div>
            <div className="cursor-pointer inline-flex items-center gap-x-1 text-sm text-[#1c1c24] dark:text-white decoration-2 font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
              <svg
                class="flex-shrink-0 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>
          </button>
        )}
        <ConnectWallet
          theme="dark"
          switchToActiveChain={true}
          displayBalanceToken={{ 1: "ETH" }}
          auth={{
            loginOptional: false,
          }}
        />

        {/* <Link to="/profile">
     <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
      <img src={wlf} alt="user" className="w-[60%] h-[60%] object-contain" />
     </div>
    </Link> */}
      </div>

      {/* Small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <Link to="/">
          <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <img
              src={logo}
              alt="user"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </Link>

        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div
          className={`absolute top-[60px] right-0 left-0 dark:bg-[#1c1c24] bg-white z-10 shadow-secondary py-4 ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          <ul className="mb-4 z-10">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${
                  isActive === link.name && "bg-[#3a3a43]"
                }`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${
                    isActive === link.name ? "grayscale-0" : "grayscale"
                  }`}
                />
                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                    isActive === link.name ? "text-[#1dc071]" : "text-[#808191]"
                  }`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex mx-4">
            {address ? (
              <CustomButton
                btnType="button"
                title="Create a proposal"
                styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
                handleClick={() => {
                  if (address) navigate("proposals");
                  else connect();
                }}
              />
            ) : (
              <ConnectWallet
                theme="dark"
                switchToActiveChain={true}
                displayBalanceToken={{ 1: "ETH" }}
                auth={{
                  loginOptional: false,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

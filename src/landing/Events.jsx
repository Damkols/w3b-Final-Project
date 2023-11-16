import React from "react";

const Events = () => {
  return (
    <div
      className="w-full dark:bg-gray-500 mt-18 md:mt-28"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/damkols/image/upload/v1700137996/web3bridge/gl3elbir4wbzxmi8cvgz.jpg')",
        backgroundPosition: "center center",
        backgroundBlendMode: "multiply",
        backgroundSize: "cover",
      }}
    >
      <div className="container flex flex-col flex-wrap content-center justify-center p-4 py-20 mx-auto md:p-10">
        <h1 className="text-2xl md:text-5xl antialiased font-semibold leadi text-center dark:text-gray-100">
          Get Our Updates
        </h1>
        <p className="pt-2 pb-8 text-xs md:text-xl antialiased text-center dark:text-gray-100">
          Find out about events and other news
        </p>
        <div className="flex flex-row items-center justify-center">
          <input
            type="text"
            placeholder="example@email.com"
            className="w-2/5 md:w-3/5 p-1 md:p-3 rounded-l-lg"
          />
          <button
            type="button"
            className="px-4 py-1 md:px-8 md:py-3 font-semibold border-black rounded dark:border-gray-100 dark:text-gray-100"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Events;

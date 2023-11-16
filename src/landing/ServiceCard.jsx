import React from "react";
import { IoArrowForward } from "react-icons/io5";

const ServiceCard = ({ imageUrl, icon, title, description }) => {
  return (
    <li className=" dark:bg-gray-800 dark:text-gray-50">
      <div className="container grid grid-cols-12 mx-auto rounded-md shadow-md">
        <div className="flex flex-col justify-center col-span-12 dark:bg-gray-700 lg:col-span-6 lg:h-auto">
          <div className="flex flex-col items-center p-8 py-12 text-center">
            <img
              src={imageUrl}
              alt=""
              className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500"
            />
          </div>
        </div>
        <div className="flex flex-col col-span-12 p-6 divide-y lg:col-span-6 lg:p-10 dark:divide-gray-700">
          <div className="pt-6 pb-4 space-y-2">
            <span>{icon}</span>
            <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
            <p>{description}</p>
            <a
              rel="noopener noreferrer"
              className="inline-flex items-center py-2 space-x-2 text-sm dark:text-violet-400"
            >
              <span>Read more</span>
              <IoArrowForward color="#91be55" fontSize={25} />
            </a>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ServiceCard;

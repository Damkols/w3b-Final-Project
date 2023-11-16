import React from "react";
import ServiceCard from "./ServiceCard"; // Create a ServiceCard component for reusability
import {
  IoLeafOutline,
  IoFlowerOutline,
  IoArrowForward,
  IoEarthOutline,
  IoBoatOutline,
} from "react-icons/io5";

const servicesData = [
  {
    imageUrl:
      "https://res.cloudinary.com/damkols/image/upload/v1700091601/web3bridge/skwolxbqs1us1dygpzs0.jpg",
    icon: <IoLeafOutline color="#91be55" fontSize={50} />,
    title: "Save Nature",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, a!",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/damkols/image/upload/v1700091688/web3bridge/rowvga3x1h98xhj7slqi.jpg",
    icon: <IoEarthOutline color="#91be55" fontSize={50} />,
    title: "Save Ecology",
    description:
      "Curabitur luctus erat nunc, sed ullamcorper erat vestibulum eget.",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/damkols/image/upload/v1700092019/web3bridge/sj4xv46nlcgqtn6doc9a.jpg",
    icon: <IoFlowerOutline color="#91be55" fontSize={50} />,
    title: "Tree Plantation",
    description:
      "Curabitur luctus erat nunc, sed ullamcorper erat vestibulum eget.",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/damkols/image/upload/v1700091915/web3bridge/ghskcher8qqx6pdn1i3i.jpg",
    icon: <IoBoatOutline color="#91be55" fontSize={50} />,
    title: "Clear Ocean",
    description:
      "Curabitur luctus erat nunc, sed ullamcorper erat vestibulum eget.",
  },
];

const Service = () => {
  const backgroundImageUrl =
    "https://res.cloudinary.com/damkols/image/upload/v1699981970/web3bridge/t41sauwtsml3h1fq0prt.png";
  return (
    <section
      className="mt-28"
      id="service"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div>
        {/* Section content */}
        <div className="flex justify-center items-center">
          <img
            src="https://res.cloudinary.com/damkols/image/upload/v1699982436/web3bridge/iz5yi8xlljvkfzvi2tvy.png"
            width="32"
            height="7"
            alt="Wavy line"
          />
          <span className="ml-2 text-2xl dark:text-white"> What We Do</span>
        </div>
        <h2 className="mb-6 text-2xl md:text-6xl text-center dark:text-white">
          We Work Differently to <strong>keep The World Safe</strong>
        </h2>

        {/* Service cards */}
        <ul className="service-list">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Service;

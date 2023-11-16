import { IoHeartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
// import './Hero.css';
// import Features from '../Features/Features';

const Hero = () => {
  return (
    <div
      className="hero min-h-[90vh]"
      style={{
        backgroundImage:
          "url(https://res.cloudinary.com/damkols/image/upload/v1700142312/web3bridge/szhmfdy8ewdmgehtuzs7.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-xl">
          <h1 className="mb-5 text-5xl font-bold">Save Mother Nature</h1>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <Link to="/details">
            <button className="px-8 py-2 btn btn-accent text-xl">
              Go To Dapp
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;

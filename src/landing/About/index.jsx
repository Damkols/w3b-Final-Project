import "./About.css";
import { IoCheckmarkCircle } from "react-icons/io5";

const About = () => {
  return (
    <section className="section about" id="about">
      <div className="contain">
        <div className="about-banner">
          {/* <h2 className="deco-title">About Us</h2> */}
          <img
            src="https://res.cloudinary.com/damkols/image/upload/v1699826072/web3bridge/ijcowj37zmitpto9gw7v.png"
            width="58"
            height="261"
            alt=""
            className="deco-img"
          />
          <div className="banner-row">
            <div className="banner-col">
              <img
                src="https://res.cloudinary.com/damkols/image/upload/v1699826073/web3bridge/kkvaoccssnqp5tww9qrq.jpg "
                width="315"
                height="380"
                loading="lazy"
                alt="Tiger"
                className="about-img w-100"
              />
              <img
                src="https://res.cloudinary.com/damkols/image/upload/v1699826073/web3bridge/ucb0kjgnuxl8az3guazw.jpg"
                width="386"
                height="250"
                loading="lazy"
                alt="Panda"
                className="about-img about-img-2 w-100"
              />
            </div>
            <div className="banner-col">
              <img
                src="https://res.cloudinary.com/damkols/image/upload/v1699826073/web3bridge/dflxqe6wuoklvfsebnmd.jpg"
                width="250"
                height="277"
                loading="lazy"
                alt="Elephant"
                className="about-img about-img-3 w-100"
              />
              <img
                src="https://res.cloudinary.com/damkols/image/upload/v1699826072/web3bridge/uwplrpe1zziklurzpd6n.jpg"
                width="315"
                height="380"
                loading="lazy"
                alt="Deer"
                className="about-img w-100"
              />
            </div>
          </div>
        </div>
        <div className="about-content">
          <p className="section-subtitle">
            <img
              src="https://res.cloudinary.com/damkols/image/upload/v1699982436/web3bridge/iz5yi8xlljvkfzvi2tvy.png"
              width="32"
              height="7"
              alt="Wavy line"
            />
            <span>Why Choose Us</span>
          </p>
          <h2 className="h2 section-title">
            Raise Your Hand to Save <strong>World Animals</strong>
          </h2>
          <ul className="tab-nav">
            <li>
              <button className="tab-btn active">Our Mission</button>
            </li>
            <li>
              <button className="tab-btn">Our Vision</button>
            </li>
            <li>
              <button className="tab-btn">Next Plan</button>
            </li>
          </ul>
          <div className="tab-content">
            <p className="section-text">
              But I must explain to you how all this mistaken denouncing
              pleasure and praising pain was born, and I will give you a
              complete account of the system expoundmaster
            </p>
            <ul className="tab-list">
              <li className="tab-item">
                <div className="item-icon">
                  <IoCheckmarkCircle />
                  {/* <ion-icon name="checkmark-circle"></ion-icon> */}
                </div>
                <p className="tab-text">Charity For Foods</p>
              </li>
              <li className="tab-item">
                <div className="item-icon">
                  <IoCheckmarkCircle />
                  {/* <ion-icon name="checkmark-circle"></ion-icon> */}
                </div>
                <p className="tab-text">Charity For Education</p>
              </li>
              <li className="tab-item">
                <div className="item-icon">
                  <IoCheckmarkCircle />
                  {/* <ion-icon name="checkmark-circle"></ion-icon> */}
                </div>
                <p className="tab-text">Charity For Water</p>
              </li>
              <li className="tab-item">
                <div className="item-icon">
                  <IoCheckmarkCircle />

                  {/* <ion-icon name="checkmark-circle"></ion-icon> */}
                </div>
                <p className="tab-text">Charity For Medical</p>
              </li>
            </ul>
            <button className="btn btn-secondary">
              <span>Learn More</span>
              <ion-icon name="heart-outline" aria-hidden="true"></ion-icon>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

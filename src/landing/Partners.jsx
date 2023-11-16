const Partners = () => {
  const partnerLogos = [
    {
      normalSrc:
        "https://res.cloudinary.com/damkols/image/upload/v1699974304/web3bridge/szjbslvtrn67eofvmtcv.png",
      activeSrc:
        "https://res.cloudinary.com/damkols/image/upload/v1699974304/web3bridge/onqnggbcpvnvsq9cqhql.png",
      alt: "Children Fund",
      width: 157,
      height: 55,
    },
    {
      normalSrc:
        "https://res.cloudinary.com/damkols/image/upload/v1699974385/web3bridge/zys1jnk8hbkijcoezfkk.png",
      activeSrc:
        "https://res.cloudinary.com/damkols/image/upload/v1699974386/web3bridge/lpmkzghcgwfgsfa9fcvx.png",
      alt: "Non Profit Agency",
      width: 163,
      height: 55,
    },
    {
      normalSrc:
        "https://res.cloudinary.com/damkols/image/upload/v1699974460/web3bridge/dkxhrndggdjccuwbw9v1.png",
      activeSrc:
        "https://res.cloudinary.com/damkols/image/upload/v1699974460/web3bridge/tlqktvy0z0zdhooopbcb.png",
      alt: "Rise Hand Help Us",
      width: 149,
      height: 55,
    },
    {
      normalSrc:
        "https://res.cloudinary.com/damkols/image/upload/v1699974520/web3bridge/yfzbfpjzyzrrs7oaejfb.png",
      activeSrc:
        "https://res.cloudinary.com/damkols/image/upload/v1699974521/web3bridge/o2iyrkvxgsqfpumt6vdr.png",
      alt: "Helping",
      width: 169,
      height: 58,
    },
    {
      normalSrc:
        "https://res.cloudinary.com/damkols/image/upload/v1699974574/web3bridge/wvujwht3cu9asg2ikugs.png",
      activeSrc:
        "https://res.cloudinary.com/damkols/image/upload/v1699974574/web3bridge/o0atwhdjghslfndc9j5t.png",
      alt: "Poor Fund Organization",
      width: 211,
      height: 55,
    },
  ];

  return (
    <section className="mt-28">
      <div className="flex flex-wrap sm:justify-evenly justify-center items-center gap-[50px]">
        {partnerLogos.map((partner, index) => (
          <a href="#" className="partner-logo" key={index}>
            {/* <img
              src={partner.normalSrc}
              width={partner.width}
              height={partner.height}
              loading="lazy"
              alt={partner.alt}
              className="hover:hidden"
            /> */}
            <img
              src={partner.activeSrc}
              width={partner.width}
              height={partner.height}
              loading="lazy"
              alt={partner.alt}
            />
          </a>
        ))}
      </div>
    </section>
  );
};

export default Partners;

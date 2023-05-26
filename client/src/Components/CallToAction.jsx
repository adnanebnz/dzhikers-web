import React from "react";
import DownloadAds from "./DownloadAds";
import PhoneImage from "../assets/test.png";
const CallToAction = () => {
  return (
    <div className="text-white mt-5">
      <div className="wrapper bg-blue-800 flex items-center justify-between px-[5rem] rounded-b-[5rem] w-[100%] h-[33rem] relative z-[3]">
        {/* left side */}
        <div className="headings flex flex-col items-start justify-center h-[100%] text-[3rem]">
          <span className="font-semibold">Découvrez</span>{" "}
          <span>
            <b>les meilleures places de l'algérie</b>
          </span>
          <span className="text-[15px] text-white">
            Télechargez notre application
            <br />
            Pour qu'elle vous aide à découvrir les meilleures places de
            l'algérie
          </span>
          {/* download ads */}
          <div>
            <span className="text-[13px]">
              Téléchargez maintenant sur IOS et Android
            </span>
            <DownloadAds />
          </div>
        </div>
        {/* right side */}
        <div className="images relative w-[50%]">
          <img
            src={PhoneImage}
            alt=""
            className="absolute top-[-15rem] h-[34rem] left-[13rem]"
          />
        </div>
      </div>
    </div>
  );
};

export default CallToAction;

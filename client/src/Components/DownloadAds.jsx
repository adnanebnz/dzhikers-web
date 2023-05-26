import React from "react";
import AppStore from "../assets/App Store.png";
import GooglePlay from "../assets/Google Play.png";
function DownloadAds() {
  const downloadImgStyle =
    "border-[2px] border-[#232A4E] rounded-[13px] h-[3rem] w-[10rem]";
  return (
    <div className="download">
      <div className="download_images flex">
        <img
          src={AppStore}
          alt=""
          className={
            downloadImgStyle + ` mr-[2rem] hover:cursor-pointer hover:shadow-xl`
          }
        />
        <img
          src={GooglePlay}
          alt=""
          className={
            downloadImgStyle + ` mr-[2rem] hover:cursor-pointer hover:shadow-xl`
          }
        />
      </div>
    </div>
  );
}

export default DownloadAds;

import React from "react";
import logo1 from "../../assets/adidas.png";
import logo2 from "../../assets/deca.png";
import logo4 from "../../assets/thf.png";
import heroImg from "../../assets/9800-ai.png";
import { useNavigate } from "react-router-dom";
const Hero = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-white w-full overflow-hidden pb-5" id="hero">
        <div className="bg-white relative sm:pt-16 px-10">
          <div className="relative m-auto px-6">
            <h1 className="mx-auto w-full  font-black text-gray-700 text-4xl text-center sm:text-4xl md:text-5xl lg:w-auto lg:text-left xl:text-6xl">
              Nous trouverons un chemin
              <br className="" />
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
                ou nous en créerons un.
              </span>
            </h1>
            <div className="lg:flex">
              <div className="relative mt-8 md:mt-16 space-y-8 sm:w-10/12 md:w-2/3 lg:ml-0 sm:mx-auto text-center lg:text-left lg:mr-auto lg:w-7/12">
                <p className="sm:text-lg text-gray-700 lg:w-11/12">
                  Notre plateforme vous permet de trouver des randonnées partout
                  en Algérie, ainsi que des produits relatifs à ce genre
                  d'actvités.
                </p>
                <span className="block font-semibold text-gray-500 ">
                  Faites un tour dans notre plateforme!
                </span>
                <div className="flex  justify-center items-center md:space-x-6 md:flex md:justify-center md:items-center lg:justify-start">
                  <a
                    aria-label="add to slack"
                    href="/boutique"
                    className="p-4 border border-gray-200  rounded-full duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-600/20 "
                  >
                    <div className="flex justify-center space-x-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
                        />
                      </svg>

                      <span className="font-medium md:block">Boutique</span>
                    </div>
                  </a>
                  <a
                    href="/randos"
                    className="p-4 border border-gray-200 rounded-full duration-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-600/20 "
                  >
                    <div className="flex justify-center space-x-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                        />
                      </svg>

                      <span className="font-medium md:block ">Randonnées</span>
                    </div>
                  </a>
                </div>

                <div className="pt-12 flex justify-center gap-6 lg:gap-12 sm:justify-around items-center grayscale lg:w-2/3">
                  <img
                    src={logo1}
                    className="h-8 sm:h-10 w-auto lg:h-12"
                    alt=""
                  />
                  <img
                    src={logo2}
                    className="h-5 sm:h-10 w-auto lg:h-5"
                    alt=""
                  />
                  <img
                    src={logo4}
                    className="h-8 sm:h-10 w-auto lg:h-12"
                    alt=""
                  />
                </div>
              </div>
              <div className="mt-7 md:mt-0 lg:absolute -right-10 lg:w-7/12">
                <div className="relative w-full">
                  <div
                    aria-hidden="true"
                    className="hidden sm:block absolute scale-75 md:scale-110 inset-0 m-auto w-full h-full md:w-64 md:h-64  rounded-full rotate-45 bg-gradient-to-r from-sky-500 to-cyan-300 blur-3xl"
                  ></div>
                  <img
                    src={heroImg}
                    className="relative w-full"
                    alt="wath illustration"
                    loading="lazy"
                    width="320"
                    height="280"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;

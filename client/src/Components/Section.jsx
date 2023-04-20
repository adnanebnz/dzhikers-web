import React from "react";
import hikers from "../assets/hikers.jpg";
import tante from "../assets/tante.jpg";
import chair from "../assets/chair.jpg";
import bottle from "../assets/bottle.jpg";
import clothes from "../assets/clothes.png";
import { useNavigate } from "react-router-dom";
const Section = () => {
  const navigate = useNavigate();
  return (
    <div className=" bg-gray-50 sm:px-14 py-10" id="recommend">
      <div className="col-span-full mb-3">
        <h2 className="mb-12 text-md text-gray-800 font-bold md:text-3xl md:px-11 text-sm px-4">
          Parcourez tout ce que nous avons a vous offrir
        </h2>
      </div>
      <div className="flex items-center justify-center gap-1 sm:block">
        <div className="grid grid-cols-1 items-center justify-center sm:grid-cols-3 lg:grid-cols-5  gap-x-4 gap-y-1">
          <div
            className=""
            onClick={() => {
              navigate("/randos");
            }}
          >
            <a href="">
              <img
                src={hikers}
                className="rounded-xl brightness-75 w-72 h-80 object-cover hover:shadow-2xl hover:ease-in hover:duration-100"
              />
            </a>
            <p className="text-xs -translate-y-6 text-white font-semibold sm:-translate-y-8 sm:text-base translate-x-3">
              Réserver des randonées
            </p>
          </div>

          <div
            className=""
            onClick={() => {
              navigate("/boutique");
            }}
          >
            <a href="">
              <img
                src={tante}
                className="rounded-xl brightness-75  w-72 h-80 object-cover hover:shadow-2xl hover:ease-in hover:duration-100"
              />
            </a>
            <p className="text-xs -translate-y-6 text-white font-semibold sm:-translate-y-8 sm:text-base translate-x-3">
              Tantes de camping
            </p>
          </div>

          <div
            className=""
            onClick={() => {
              navigate("/boutique");
            }}
          >
            <a href="">
              <img
                src={chair}
                className="rounded-xl brightness-75  w-72 h-80 object-cover hover:shadow-2xl hover:ease-in hover:duration-100"
              />
            </a>
            <p className="text-xs -translate-y-6 text-white font-semibold sm:-translate-y-8 sm:text-base translate-x-3">
              Chaises de camping
            </p>
          </div>

          <div
            className=""
            onClick={() => {
              navigate("/boutique");
            }}
          >
            <a href="">
              <img
                src={bottle}
                className="rounded-xl brightness-75 w-72 h-80 object-cover hover:shadow-2xl hover:ease-in hover:duration-100"
              />
            </a>
            <p className="text-xs -translate-y-6 text-white font-semibold sm:-translate-y-8 sm:text-base translate-x-3">
              Gourdes de camping
            </p>
          </div>
          <div
            className=""
            onClick={() => {
              navigate("/boutique");
            }}
          >
            <a href="">
              <img
                src={clothes}
                className="rounded-xl brightness-75 w-72 h-80 object-cover hover:shadow-2xl hover:ease-in hover:duration-100"
              />
            </a>
            <p className="text-xs -translate-y-6 text-white font-semibold sm:-translate-y-8 sm:text-base translate-x-3">
              Vétements sport
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;

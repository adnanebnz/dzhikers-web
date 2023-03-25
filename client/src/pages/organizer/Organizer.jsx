import React from "react";
import { Link } from "react-router-dom";
import MapApp from "../../Components/Map/MapApp";
const Organizer = () => {
  return (
    <div className="mt-12 mb-10 flex">
      <div className="w-full md:w-2/12 p-4 sm:p-6 lg:p-8 bg-gray-100 shadow-xl flex flex-col gap-8">
        <h1 className="text-xl text-gray-800 font-semibold">
          <Link to={"/organizer"}>Acceuil</Link>
        </h1>
        <h1 className="text-xl text-gray-800 font-semibold">
          Lister une randonnée
        </h1>
        <h1 className="text-xl text-gray-800 font-semibold">Mes Randonées</h1>
        <h1 className="text-xl text-gray-800 font-semibold">Participants</h1>
        <h1 className="text-xl text-gray-800 font-semibold">Emploi du temps</h1>
      </div>
      <div className="w-full md:w-10/12 p-8 bg-gray-100 lg:ml-4 shadow-xl">
        <h1 className="text-center text-gray-800 font-semibold text-xl py-5">
          Carte de randonnées actuellement disponibles
        </h1>

        <div className="h-full w-full">
          <MapApp />
        </div>
      </div>
    </div>
  );
};

export default Organizer;

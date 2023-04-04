import MapApp from "../../Components/Map/MapApp";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import WeatherApp from "../../Components/Map/WeatherApp";
import CloseIcon from "@mui/icons-material/Close";

import ThermostatIcon from "@mui/icons-material/Thermostat";
const Organizer = () => {
  const navigate = useNavigate();
  const [showWeather, setShowWeather] = useState(null);
  return (
    <section class="body-font relative z-0">
      <MapApp />
      <div className="z-10 absolute top-36 right-2">
        <button
          style={{ padding: "3px  3px" }}
          className="bg-white rounded-md"
          onClick={() => {
            setShowWeather(true);
          }}
        >
          <ThermostatIcon className="text-gray-700" />
        </button>
      </div>
      {showWeather && (
        <div className="z-10 absolute top-44 right-2">
          <WeatherApp state={showWeather} />
        </div>
      )}
      {showWeather && (
        <div className="z-10 absolute top-48 right-5">
          <button
            onClick={() => {
              setShowWeather(false);
            }}
          >
            <CloseIcon />
          </button>
        </div>
      )}

      <div className="z-10 absolute top-2 left-2 p-4 bg-gray-100 opacity-95 rounded-md shadow-2xl flex flex-col gap-4">
        <div>
          <h1 className="text-lg text-gray-900 font-semibold">
            Double Cliquez sur l'endroit que vous voulez pour créer votre
            randonnée
          </h1>
          <p className="text-md text-gray-600">
            PS: les marques de couleur bleue sont les vôtres
          </p>
        </div>
        <div>
          <button
            className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => {
              navigate("/organizer/overview");
            }}
          >
            Gérer mes randonnées
          </button>
        </div>
      </div>
    </section>
  );
};

export default Organizer;

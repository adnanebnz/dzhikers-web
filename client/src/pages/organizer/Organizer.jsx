import { useState } from "react";
import { Link } from "react-router-dom";
import MapApp from "../../Components/Map/MapApp";
import MakeRando from "./MakeRando";
import Participants from "./Participants";
import MyRandos from "./MyRandos";
import TimeTable from "./TimeTable";
const Organizer = () => {
  const [myRandos, setMyRandos] = useState(false);
  const [main, setMain] = useState(true);
  const [timeTable, setTimeTable] = useState(false);
  const [participants, setParticipants] = useState(false);
  const [makeRandos, setMakeRandos] = useState(false);
  return (
    <div className="mt-12 mb-10 flex">
      <div className="w-full md:w-2/12 p-4 sm:p-6 lg:p-8 bg-gray-100 shadow-xl flex flex-col gap-8">
        <h1
          className="text-xl text-gray-800 font-semibold cursor-pointer"
          onClick={() => {
            setMyRandos(false);
            setMain(true);
            setTimeTable(false);
            setParticipants(false);
            setMakeRandos(false);
          }}
        >
          Acceuil
        </h1>
        <h1
          className="text-xl text-gray-800 font-semibold cursor-pointer"
          onClick={() => {
            setMyRandos(false);
            setMain(false);
            setTimeTable(false);
            setParticipants(false);
            setMakeRandos(true);
          }}
        >
          Lister une randonnée
        </h1>
        <h1
          className="text-xl text-gray-800 font-semibold cursor-pointer"
          onClick={() => {
            setMyRandos(true);
            setMain(false);
            setTimeTable(false);
            setParticipants(false);
            setMakeRandos(false);
          }}
        >
          Mes Randonées
        </h1>
        <h1
          className="text-xl text-gray-800 font-semibold cursor-pointer"
          onClick={() => {
            setMyRandos(false);
            setMain(false);
            setTimeTable(false);
            setParticipants(true);
            setMakeRandos(false);
          }}
        >
          Participants
        </h1>
        {/* <h1
          className="text-xl text-gray-800 font-semibold cursor-pointer"
          onClick={() => {
            setMyRandos(false);
            setMain(false);
            setTimeTable(true);
            setParticipants(false);
            setMakeRandos(false);
          }}
        >
          Emploi du temps
        </h1> */}
      </div>
      <div className="w-full md:w-10/12 p-8 bg-gray-100 lg:ml-4 shadow-xl">
        {main && (
          <div>
            <h1 className="text-center text-gray-800 font-semibold text-xl py-5">
              Carte de randonnées actuellement disponibles
            </h1>

            <div className="h-full w-full">
              <MapApp />
            </div>
          </div>
        )}
        {makeRandos && <MakeRando />}
        {myRandos && <MyRandos />}
        {participants && <Participants />}
        {timeTable && <TimeTable />}
      </div>
    </div>
  );
};

export default Organizer;

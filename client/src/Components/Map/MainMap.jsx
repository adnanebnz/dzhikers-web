import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import "./map.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import axios from "axios";
import moment from "moment";
import Loading from "../Loading";
import "moment/locale/fr";
export default function MainMap() {
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [zoom, setZoom] = useState(5.9);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get(
          `https://dzhikers.onrender.com/api/pins/pure`
        );
        setPins(res.data.pins);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getPins();
  }, []);
  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
  };

  const MAPBOX_TOKEN =
    "pk.eyJ1Ijoic2tpbGx6ZGV2IiwiYSI6ImNsZThrbmV0NjA3NjEzeW8zZTNoN3NremEifQ.J2OUiRda51tADGWwnH-cuw";
  console.log(pins);
  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <div className="mx-6" id="mapMain">
          <Map
            initialViewState={{
              latitude: 34.666667,
              longitude: 3.25,
              zoom: zoom,
            }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken={MAPBOX_TOKEN}
            style={{ height: "80vh   " }}
            scrollZoom={false}
          >
            {pins.map((pins) => (
              <>
                <Marker longitude={pins.long} latitude={pins.lat}>
                  <LocationOnIcon
                    onClick={() => handleMarkerClick(pins._id)}
                    sx={{ cursor: "pointer", color: "red", fontSize: "2rem" }}
                  />
                </Marker>
                {pins._id === currentPlaceId && (
                  <Popup
                    key={pins._id}
                    latitude={pins.lat}
                    longitude={pins.long}
                    closeButton={true}
                    closeOnClick={false}
                    onClose={() => setCurrentPlaceId(null)}
                    anchor="left"
                  >
                    <div className="card">
                      <label className="label font-semibold">Place</label>
                      <h4 className="place mb-2 text-gray-900 font-semibold">
                        {pins.title}
                      </h4>
                      <div className="flex items-center justify-center">
                        <img
                          src={pins.img}
                          alt=""
                          className="img w-48 h-32 object-cover"
                        />
                      </div>
                      <span className="mt-2 text-gray-800">
                        Date{": "}
                        <b className="text-black text-bold text-md">
                          {moment(pins.date).format("DD/MM/YYYY")}
                        </b>
                      </span>

                      <span className=" text-gray-800">
                        Prix:{" "}
                        <b className="text-black text-bold text-md">
                          {pins.price} DZD
                        </b>
                      </span>

                      <span className="username pt-2">
                        Crée par <b>{pins.organizer}</b>
                      </span>
                      <span className="date">
                        {moment(pins.createdAt).fromNow()}
                      </span>
                    </div>
                  </Popup>
                )}
              </>
            ))}
          </Map>
        </div>
      )}
    </>
  );
}

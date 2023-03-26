import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./map.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import axios from "axios";
import moment from "moment";
import "moment/locale/fr";
export default function MapApp() {
  const [pins, setPins] = useState([]);
  const [newPin, setNewPin] = useState(false);
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [lng, setLng] = useState(3.25);
  const [lat, setLat] = useState(34.666667);
  const [zoom, setZoom] = useState(5.6);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/pins/pure");
        setPins(res.data.pins);
      } catch (error) {
        console.log(error);
      }
    };
    getPins();
  }, []);
  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
  };
  const handleAddClick = (e) => {
    setLat(e.lngLat.lat);
    setLng(e.lngLat.lng);
    setNewPin(true);
  };
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const title = data.get("title");
    const desc = data.get("desc");
    const duration = data.get("duration");
    const date = data.get("date");
    const level = data.get("level");
    const places = data.get("places");
    const price = data.get("price");

    try {
      const res = await axios.post(
        "http://localhost:8800/api/pins",
        {
          title,
          desc,
          duration,
          date,
          level,
          places,
          price,
          organizer: currentUser.details.username,
          lat,
          long: lng,
          image: selectedFile,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPins([...pins, res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const MAPBOX_TOKEN =
    "pk.eyJ1Ijoic2tpbGx6ZGV2IiwiYSI6ImNsZThrbmV0NjA3NjEzeW8zZTNoN3NremEifQ.J2OUiRda51tADGWwnH-cuw";

  return (
    <div>
      <Map
        initialViewState={{
          latitude: lat,
          longitude: lng,
          zoom: zoom,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        onDblClick={handleAddClick}
        style={{ height: "100vh" }}
      >
        {pins.map((p) => (
          <>
            <Marker longitude={p.long} latitude={p.lat}>
              <LocationOnIcon
                className={`${
                  p.organizer === currentUser.details.username
                    ? "text-blue-500"
                    : "text-red-500"
                }`}
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                sx={{ cursor: "pointer", fontSize: "2rem" }}
              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                key={p._id}
                latitude={p.lat}
                longitude={p.long}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
                anchor="left"
              >
                <div className="card">
                  <label className="label font-semibold">Place</label>
                  <h4 className="place mb-2 text-gray-900 font-semibold">
                    {p.title}
                  </h4>
                  <div className="flex items-center justify-center">
                    <img
                      src={p.img}
                      alt=""
                      className="img w-48 h-32 object-cover"
                    />
                  </div>
                  <span className="mt-2 text-gray-800">
                    Date{": "}
                    <b className="text-black text-bold text-md">
                      {moment(p.date).format("DD/MM/YYYY")}
                    </b>
                  </span>

                  <span className=" text-gray-800">
                    Prix:{" "}
                    <b className="text-black text-bold text-md">
                      {p.price} DZD
                    </b>
                  </span>
                  <div className="flex items-center justify-center pt-2">
                    <button
                      className="bg-blue-500 hover:transition-all hover:bg-blue-600 text-white font-semibold h-8 w-24"
                      onClick={() => {
                        navigate(`/randos/${p._id}`);
                      }}
                    >
                      VOIR PLUS
                    </button>
                  </div>
                  <span className="username pt-2">
                    Crée par <b>{p.organizer}</b>
                  </span>
                  <span className="date">{moment(p.createdAt).fromNow()}</span>
                </div>
              </Popup>
            )}
          </>
        ))}
        {newPin && (
          <>
            <Marker
              latitude={lat}
              longitude={lng}
              offsetLeft={-3.5 * zoom}
              offsetTop={-7 * zoom}
            >
              <LocationOnIcon
                style={{
                  fontSize: 7 * zoom,
                  color: "green",
                  cursor: "pointer",
                }}
              />
            </Marker>
            <Popup
              latitude={lat}
              longitude={lng}
              closeButton={true}
              closeOnClick={false}
              onClose={() => {
                setNewPin(false);
                setCurrentPlaceId(null);
                setLat(null);
                setLng(null);
              }}
              anchor="left"
            >
              <div>
                <form className="form" onSubmit={handleSubmit}>
                  <label className="label">Titre</label>
                  <input
                    className="input"
                    placeholder="Entrer un titre"
                    name="title"
                    autoFocus
                  />
                  <label className="label">Description</label>
                  <textarea
                    className="textarea"
                    placeholder="Dites quelque chose a propose de cet endroit"
                    name="desc"
                  />

                  <label className="label">Date de la randonnée</label>
                  <input
                    className="input"
                    type="date"
                    placeholder="Entrer le nombre de personnes qui peuvent venir"
                    name="date"
                  />
                  <label className="label">Places disponibles</label>
                  <input
                    className="input"
                    placeholder="Entrer le nombre de personnes qui peuvent venir"
                    name="places"
                  />
                  <label className="label">Niveau de la randonée</label>
                  <input
                    className="input"
                    placeholder="Entrer un niveau"
                    name="level"
                  />
                  <label className="label">Duration de la randonée</label>
                  <input
                    className="input"
                    placeholder="Entrer la duration"
                    name="duration"
                  />
                  <label className="label">Prix de la randonée</label>
                  <input
                    className="input"
                    placeholder="Entrer le prix de la randonée par personne"
                    name="price"
                  />
                  <input
                    className="input"
                    type="file"
                    required
                    name="image"
                    id="image"
                    onChange={handleFileSelect}
                    placeholder="Entrez une image de cet endroit"
                  />
                  <button type="submit" className="submitButton">
                    Ajouter la randonée
                  </button>
                </form>
              </div>
            </Popup>
          </>
        )}
      </Map>
    </div>
  );
}

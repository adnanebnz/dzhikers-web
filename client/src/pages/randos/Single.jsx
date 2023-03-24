import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../Components/Loading";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import UserMap from "../../Components/Map/UserMap";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Single = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:8800/api/pins/${id}`);
      setData(res.data);
      setLoading(false);
    };
    fetchData();
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentUser === null) {
        navigate("/login");
      }
      const res = await axios.post(
        `http://localhost:8800/api/reservations/${id}/register`,
        {
          hikeId: id,
          firstName: currentUser.details.firstName,
          lastName: currentUser.details.lastName,
          email: currentUser.details.email,
          age: currentUser.details.age,
          places: data.places,
          lat: data.lat,
          long: data.long,
          price: data.price,
          hikeTitle: data.title,
          userId: currentUser.details._id,
        }
      );
      setOpen(false);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
            <div className="flex flex-col md:flex-row -mx-4">
              <div className="md:flex-1 px-4">
                <div>
                  <img src={data.img} alt="" className="rounded-lg" />
                </div>
              </div>
              <div className="md:flex-1 px-4">
                <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
                  {data.title}
                </h2>
                <p className="text-gray-500 text-sm">
                  De{" "}
                  <a href className="text-blue-600 hover:underline">
                    {data.organizer}
                  </a>
                </p>
                <div className="flex items-center space-x-4 my-2">
                  <div>
                    <div className="rounded-lg bg-gray-100 flex gap-1 py-2 px-3">
                      <span className="font-bold text-blue-500 text-2xl">
                        {data.price}
                      </span>
                      <span className="text-blue-400 mr-1 mt-1 font-semibold">
                        DZD
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex mb-3">
                  {data.places === 0 && (
                    <h1 className="text-xl text-red-700">
                      Pas de places restantes
                    </h1>
                  )}
                  {data.places > 0 && (
                    <h1 className="text-xl text-green-700">
                      {data.places} places restantes
                    </h1>
                  )}
                </div>
                <div className="flex gap-2 items-center">
                  <h1 className="text-md text-gray-800">Date :</h1>
                  <h1 className="text-xl text-gray-900 font-bold">
                    {moment(data.date).format("DD/MM/YYYY")}
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <h1 className="text-md text-gray-800">
                    Niveau de difficulté :
                  </h1>
                  <h1 className="text-xl text-gray-900">{data.level}</h1>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-md text-gray-800">Duration :</h1>
                  <h1 className="text-xl text-gray-900">
                    {data.duration} jours
                  </h1>
                </div>
                <p className="text-gray-500">{data.desc}</p>

                <div className="flex py-4 gap-7 items-center">
                  <button
                    type="button"
                    className="h-12 w-30 mt-6 px-4 font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex gap-1 items-center"
                    onClick={handleClickOpen}
                  >
                    <ConfirmationNumberIcon />
                    Réserver
                  </button>
                  <Dialog open={open} keepMounted onClose={handleClose}>
                    <DialogTitle>{"Êtes-vous sûr?"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        <h1 className="text-gray-700">
                          Vous voulez réserver votre place a cette randonnée?
                        </h1>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>ANNULER</Button>
                      <Button onClick={handleSubmit}>ACCEPTER</Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
          <div className="my-10 overflow-hidden">
            <h1 className="text-3xl text-gray-800 font-bold ml-5 sm:ml-7 mb-5">
              Localistaion :
            </h1>
            <UserMap lat={data.lat} long={data.long} />
          </div>
        </div>
      )}
    </>
  );
};

export default Single;

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { Typography, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import noavatar from "../../assets/noavatar.png";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MapApp from "../../Components/Map/MapApp";
const Profile = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { id } = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://busy-ruby-xerus-fez.cyclic.app/api/users/${id}`,
          {
            withCredentials: true,
          }
        );
        setData(res.data);
      } catch (error) {
        setError(error.response.data.message);
      }
    };
    fetchData();
  }, [id]);
  const handleAccountDelete = async () => {
    try {
      await axios.delete(
        `https://busy-ruby-xerus-fez.cyclic.app/api/users/${id}`,
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {currentUser.details._id !== id && (
        <Box height="100vh">
          <Typography variant="h3" sx={{ color: "red" }} textAlign="center">
            Vous n'avez pas accès à cette page
          </Typography>
        </Box>
      )}
      {currentUser.details._id === id && (
        <Box marginTop="20px" marginBottom="10px">
          {error && (
            <Box height="100vh">
              <Typography variant="h3" sx={{ color: "red" }} textAlign="center">
                {error}
              </Typography>
            </Box>
          )}
          {!error && (
            <div className="mt-3 mb-10">
              <div className="flex flex-col items-center justify-center py-12">
                {data.img ===
                  "https://busy-ruby-xerus-fez.cyclic.app/Images/undefined" && (
                  <img
                    src={noavatar}
                    alt="Avatar"
                    className="w-32 h-32 rounded-full mb-4 object-cover"
                  />
                )}
                {data.img !==
                  "https://busy-ruby-xerus-fez.cyclic.app/Images/undefined" && (
                  <img
                    src={data.img}
                    alt="Avatar"
                    className="w-32 h-32 rounded-full mb-4 object-cover"
                  />
                )}
                <h1 className="text-2xl font-bold mb-2">
                  {data.lastName} {data.firstName}
                </h1>
                <p className="text-gray-600 mb-6">@{data.username}</p>
                <div className="flex justify-center space-x-4">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      navigate("/profile/modifier/" + id);
                    }}
                  >
                    <EditIcon
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    Modifier votre profil
                  </button>
                  <button
                    className="flex items-center px-3 py-2  rounded font-semibold text-white focus:outline-none  bg-red-600 hover:bg-red-700"
                    onClick={() => setOpen(true)}
                  >
                    <DeleteIcon
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    Supprimer votre compte
                  </button>
                </div>
              </div>
              <div className="flex gap-4 flex-col px-6 sm:px-12 lg:px-32">
                <div>
                  <h1 className="text-xl text-gray-900 font-bold">
                    INFORMATIONS :
                  </h1>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-lg sm:text-xl">Email :</h1>
                    <h1 className="font-semibold text-md sm:text-lg">
                      {data.email}
                    </h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-lg sm:text-xl">Age :</h1>
                    <h1 className="font-semibold text-md sm:text-lg">
                      {data.age} ans
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          )}
          <Dialog open={open} keepMounted onClose={handleClose}>
            <DialogTitle>{"Êtes-vous sûr?"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <h1 className="text-gray-700">
                  Vous voulez vraiment supprimer votre compte?
                </h1>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>ANNULER</Button>
              <Button onClick={handleAccountDelete}>ACCEPTER</Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </>
  );
};

export default Profile;

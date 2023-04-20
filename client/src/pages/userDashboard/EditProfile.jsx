import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import Loading from "../../Components/Loading";
export default function EditProfile() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(undefined);
  const [pfpAlert, setPfpAlert] = useState(false);
  const [infosAlert, setInfosAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingOne, setLoadingOne] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setInfosAlert(false);
    setPfpAlert(false);
  };
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
    setImage(URL.createObjectURL(event.target.files[0]));
  };
  const handlePfpChange = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(
        `https://busy-ruby-xerus-fez.cyclic.app/api/users/${id}/updatePfp`,
        {
          img: selectedFile,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
        { withCredentials: true }
      );
      console.log(res);
      setLoading(false);
      setPfpAlert(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoadingOne(true);
    try {
      setLoadingOne(true);
      const res = await axios.put(
        `https://busy-ruby-xerus-fez.cyclic.app/api/users/${id}`,
        {
          lastName: event.target.lastName.value,
          firstName: event.target.firstName.value,
          age: event.target.age.value,
          email: event.target.email.value,
          password: event.target.password.value,
        },

        {
          withCredentials: true,
        }
      );
      setLoadingOne(false);
      setInfosAlert(true);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    }
  };
  return (
    <>
      {currentUser.details._id !== id && (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-2xl font-semibold text-red-500">
            Vous n'avez pas accès à cette page
          </h1>
        </div>
      )}
      {currentUser.details._id === id && (
        <>
          <div className="mx-8 mt-10 mb-10">
            <div>
              <div className="border-b-2 block  felx-col lg:flex">
                <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-gray-100 shadow-xl">
                  <div className="flex sm:justify-between sm:flex-row flex-col gap-5 justify-center items-center">
                    <span className="text-lg sm:text-xl font-semibold block">
                      Modifier votre photo de profile
                    </span>
                    <button
                      onClick={handlePfpChange}
                      className="-mt-2 text-md font-bold text-white bg-blue-600 rounded-full px-2 h-11 w-32  sm:px-5 sm:py-2 hover:bg-blue-700"
                    >
                      Sauvgarder
                    </button>
                  </div>

                  <div className="w-full mt-2 sm:mt-20 mx-2 flex sm:justify-around flex-col sm:flex-row items-center gap-10">
                    <div>
                      <div className="flex flex-col items-center">
                        <label
                          htmlFor="image"
                          className="mt-10 font-medium text-gray-700"
                        >
                          <input
                            style={{ display: "none" }}
                            id="image"
                            name="image"
                            type="file"
                            onChange={handleFileSelect}
                          />

                          <div className="flex items-center justify-center w-full px-4 py-2 transition duration-500 ease-in-out transform bg-white border rounded-md shadow-md cursor-pointer hover:bg-gray-100 hover:scale-105">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6 pr-1"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                              />
                            </svg>

                            <span className="font-medium text-gray-600 truncate">
                              Choisir votre photo
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>
                    <img
                      id="showImage"
                      className={`w-32 h-32 items-center rounded-full object-cover ${
                        image === null ? "hidden" : "block"
                      }`}
                      src={image}
                      alt=""
                    />
                  </div>
                  {loading && <Loading />}
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="w-full md:w-3/5 p-8 bg-gray-100 lg:ml-4 shadow-xl"
                >
                  <div className="rounded  shadow p-6">
                    <div className="pb-6">
                      <label
                        htmlFor="name"
                        className="font-semibold text-gray-700 block pb-1"
                      >
                        Nom
                      </label>
                      <div className="flex">
                        <input
                          id="username"
                          name="lastName"
                          className="border border-solid0 border-gray-300  rounded-r px-4 py-2 w-full"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="pb-6">
                      <label
                        htmlFor="name"
                        className="font-semibold text-gray-700 block pb-1"
                      >
                        Prénom
                      </label>
                      <div className="flex">
                        <input
                          id="username"
                          name="firstName"
                          className="border border-solid0 border-gray-300  rounded-r px-4 py-2 w-full"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="pb-6">
                      <label
                        htmlFor="name"
                        className="font-semibold text-gray-700 block pb-1"
                      >
                        Age
                      </label>
                      <div className="flex">
                        <input
                          id="username"
                          name="age"
                          className="border border-solid0 border-gray-300  rounded-r px-4 py-2 w-full"
                          type="number"
                        />
                      </div>
                    </div>
                    <div className="pb-6">
                      <label
                        htmlFor="name"
                        className="font-semibold text-gray-700 block pb-1"
                      >
                        Email
                      </label>
                      <div className="flex">
                        <input
                          id="username"
                          name="email"
                          className="border border-solid0 border-gray-300  rounded-r px-4 py-2 w-full"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="pb-4">
                      <label
                        htmlFor="about"
                        className="font-semibold text-gray-700 block pb-1"
                      >
                        Mot de passe
                      </label>
                      <input
                        id="email"
                        name="password"
                        className="border-1  rounded-r px-4 py-2 w-full"
                        type="password"
                      />
                      <span className="text-gray-600 pt-4 block opacity-70 sm:text-sm text-md ">
                        Les informations personnelles de connexion de votre
                        compte
                      </span>
                    </div>
                    <div className="flex items-center justify-center pt-3">
                      <button
                        type="submit"
                        className="-mt-2 text-md font-bold text-white bg-blue-600 rounded-full sm:px-5 sm:py-2 h-11 w-96  sm:w-64 hover:bg-blue-700"
                      >
                        Modifier vos informations
                      </button>
                    </div>
                    {loadingOne && <Loading />}
                  </div>
                </form>
              </div>
            </div>
            {pfpAlert && (
              <Snackbar
                open={pfpAlert}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  La photo de profil a été mise à jour avec succès, vous la
                  verrez une fois que vous vous reconnecterez !
                </Alert>
              </Snackbar>
            )}
            {infosAlert && (
              <Snackbar
                open={infosAlert}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  Informations modifié avec success!.
                </Alert>
              </Snackbar>
            )}
          </div>
        </>
      )}
    </>
  );
}

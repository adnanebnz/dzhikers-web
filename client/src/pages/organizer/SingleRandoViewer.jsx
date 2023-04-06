import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import Dropzone from "react-dropzone";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { IoNotificationsSharp as IoMdNotifications } from "react-icons/io5";

const SingleRandoViewer = () => {
  moment.locale("fr");
  const handleDrop = (acceptedFiles) => {};
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [editComment, setEditComment] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [announces, setAnnounces] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [open, setOpen] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/reservations/${id}/details`
        );

        setData(res.data.reservations);
        setParticipants(res.data.participants);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchAnnounces = async () => {
      try {
        const res2 = await axios.get(
          `http://localhost:8800/api/announces/${id}`
        );
        setAnnounces(res2.data.announce);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAnnounces();
    fetchData();
  }, []);
  const totalIncomes = data.reduce((acc, curr) => {
    return acc + curr.price;
  }, 0);
  const totalParticipants = data.length;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const title = data.get("title");
    const desc = data.get("description");
    try {
      const res = await axios.post(
        `http://localhost:8800/api/announces`,
        {
          title: title,
          description: desc,
          hikeId: id,
          organizerId: currentUser.details._id,
        },
        {
          withCredentials: true,
        }
      );
      setOpen(true);
      setAnnounces([...announces, res.data]);
    } catch (err) {
      console.log(err);
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/announces/${id}`, {
        withCredentials: true,
      });
      setAnnounces(announces.filter((announce) => announce._id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdit = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:8800/api/announces/${id}`,
        { title: title, description: desc },
        {
          withCredentials: true,
        }
      );
      setEditComment(false);
      setAnnounces(
        announces.map((announce) =>
          announce._id === id ? { ...announce, ...res.data } : announce
        )
      );
    } catch (err) {
      console.log(err);
    }
  };
  const handleRandoEdit = async (event) => {
    event.preventDefault();
    try {
      await axios.put("", {
        organizer: currentUser.details.username,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {data.length === 0 && (
        <h1 className="text-xl text-center mt-20">
          Auccun participant pour cette randonnée
        </h1>
      )}
      {data.length !== 0 && (
        <div className="flex justify-center  py-10 p-14  mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-9 ">
            <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
              <div className="h-20 bg-blue-500 flex items-center justify-between">
                <p className="mr-0 text-white text-lg pl-5">
                  Participants total
                </p>
              </div>
              <div className="flex justify-between px-5 pt-6 mb-2 text-sm text-gray-600">
                <p>TOTAL</p>
              </div>
              <p className="py-4 text-3xl ml-5">{totalParticipants}</p>
              <hr />
            </div>

            <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
              <div className="h-20 bg-purple-400 flex items-center justify-between">
                <p className="mr-0 text-white text-lg pl-5">
                  Total des revenus
                </p>
              </div>
              <div className="flex justify-between pt-6 px-5 mb-2 text-sm text-gray-600">
                <p>TOTAL</p>
              </div>
              <p className="py-4 text-3xl ml-5">{totalIncomes} DZD</p>
              <hr />
            </div>
          </div>
        </div>
      )}
      {data.length !== 0 && (
        <>
          <div className="container px-11">
            <h1 className="text-gray-800 text-2xl">Participants :</h1>
          </div>
          <div className="flex items-center justify-center">
            <Table
              className="shadow-lg mt-3 overflow-hidden mb-5"
              sx={{ width: "40%" }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>Nom</TableCell>
                  <TableCell>Prénom</TableCell>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {participants.map((row) => (
                  <TableRow hover="true">
                    <TableCell>{row.firstName}</TableCell>
                    <TableCell>{row.lastName}</TableCell>
                    <TableCell>{row.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
      <div className="container px-11 pt-11 mt-5">
        <div className="flex items-center gap-2 mb-3">
          <h1 className="underline  decoration-sky-600 hover:decoration-blue-500 hover:transition text-2xl font-semibold underline-offset-8 text-gray-700">
            Modifier la randonée
          </h1>
        </div>
        <div className="mt-10 mb-10 flex  flex-col items-center justify-center sm:items-start sm:flex-row gap-10 sm:px-7">
          <div className="w-4/5 sm:w-2/5">
            <form onSubmit={handleRandoEdit}>
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="image"
              >
                Images de l'emplacement de la randonée
              </label>
              <div className="border border-solid border-blue-500 p-4">
                <Dropzone onDrop={handleDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p className="text-gray-700 font-semibold text-sm text-center">
                        Faites glisser pour déposez vos images ici, ou
                        simplement cliquez ici.
                      </p>
                    </div>
                  )}
                </Dropzone>
              </div>
              <button
                type="submit"
                className="px-2 py-1 bg-blue-500 rounded-md text-white font-semibold
            hover:bg-blue-600 hover:transition-all duration-100 mt-4"
              >
                Mettre a jour la photo
              </button>
            </form>
          </div>
          <form className="bg-gray-200 shadow-xl rounded px-8 pt-6 pb-8 mb-6  w-4/5 sm:w-3/5">
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="name"
              >
                Titre
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Nom du produit"
                name="title"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                placeholder="Description du produit"
                name="desc"
              ></textarea>
            </div>
            <div className="mb-4 flex items-center justify-around gap-4">
              <h1 className="block text-gray-700 font-bold">Date</h1>
              <h1 className="block text-gray-700 font-bold">Prix</h1>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="price"
                type="date"
                name="brand"
              />

              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="price"
                type="number"
                placeholder="Prix de la randonnée"
                name="price"
              />
            </div>

            <div className="mb-4">
              <div className="mb-4 flex items-center justify-around gap-4">
                <h1 className="block text-gray-700 font-bold">Niveau</h1>
                <h1 className="block text-gray-700 font-bold">Places</h1>
              </div>
              <div className="flex items-center gap-3">
                <select className="w-full p-2">
                  <option>facile</option>
                  <option>moyen</option>
                  <option>difficile</option>
                </select>

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="quantity"
                  type="number"
                  placeholder="Maximum de places disponibles"
                  name="quantity"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="px-2 py-1 bg-blue-500 rounded-md text-white font-semibold
            hover:bg-blue-600 hover:transition-all duration-100"
              >
                Mettre a jour la randonée
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* MAKE AN ANNOUNCE */}
      <div className="container px-11 pt-11 mt-5">
        <div className="flex items-center gap-2 mb-3">
          <h1 className="underline  decoration-sky-600 hover:decoration-blue-500 hover:transition text-2xl font-semibold underline-offset-8 text-gray-700">
            Faire une annonce pour cet événement
          </h1>
          <IoMdNotifications size={20} className="mt-3 text-gray-700" />
        </div>
        <div className="flex items-center justify-center p-12">
          <div className="mx-auto w-full max-w-[550px]">
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label
                  for="title"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Titre
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Titre"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <div className="mb-5">
                <label
                  for="description"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows="5"
                  placeholder="Description"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="hover:shadow-form rounded-md bg-blue-500 py-3 px-8 text-center text-base font-semibold text-white outline-none"
                >
                  Envoyer l'annonce
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* ANNOUNCEMENTS */}
      {announces.length > 0 && (
        <div className="container px-11 pt-11">
          <h1 className="text-gray-800 text-2xl">Annonces Envoyées</h1>
          <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px]">
              <div className="flex flex-col space-y-4">
                {announces.map((announcement) => (
                  <div className="bg-white rounded-md shadow-md p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={currentUser.details.img}
                          alt="Avatar"
                          className="w-10 h-10 rounded-full"
                        />

                        <div>
                          <h1 className="text-gray-800 text-base font-semibold">
                            {announcement.title}
                          </h1>
                          <p className="text-gray-500 text-sm">
                            {moment(announcement.createdAt).format("LL")}
                          </p>

                          <p>{announcement.description}</p>
                          {editComment && (
                            <>
                              <input
                                type="text"
                                name="title"
                                id="title"
                                onChange={(e) => {
                                  setTitle(e.target.value);
                                }}
                                placeholder="Titre"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mt-3 mb-3"
                              />
                              <textarea
                                name="description"
                                id="description"
                                rows="5"
                                onChange={(e) => {
                                  setDesc(e.target.value);
                                }}
                                placeholder="Description"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                              ></textarea>
                              <button
                                onClick={() => {
                                  handleEdit(announcement._id);
                                }}
                                className="px-3 py-1 bg-blue-500 hover:transition hover:bg-blue-600 text-white mt-2"
                              >
                                Modifier
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-3 items-center">
                        <IconButton
                          onClick={() => {
                            setEditComment(true);
                          }}
                        >
                          <EditIcon className="text-green-600 cursor-pointer" />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            handleDelete(announcement._id);
                          }}
                        >
                          <DeleteIcon className="text-red-600 cursor-pointer" />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {open && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Annonce envoyé avec succès!
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default SingleRandoViewer;

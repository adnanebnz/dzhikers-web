import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const SingleRandoViewer = () => {
  moment.locale("fr");
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

  return (
    <div className="h-full">
      {data.length === 0 && (
        <h1 className="text-xl text-center mt-20 h-screen">
          Rien a afficher pour le momment
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
      {/* <div className="container px-11 pt-11">
        <h1 className="text-gray-800 text-2xl">
          Modifier les informations de la randonnée
        </h1>

        <div className="flex items-center justify-center p-12">
          <div className="mx-auto w-full max-w-[550px]">
            <form action="https://formbold.com/s/FORM_ID" method="POST">
              <div className="-mx-3 flex flex-wrap">
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <label
                      for="fName"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="fName"
                      id="fName"
                      placeholder="First Name"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <label
                      for="lName"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lName"
                      id="lName"
                      placeholder="Last Name"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-5">
                <label
                  for="guest"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  How many guest are you bringing?
                </label>
                <input
                  type="number"
                  name="guest"
                  id="guest"
                  placeholder="5"
                  min="0"
                  className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              <div className="-mx-3 flex flex-wrap">
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <label
                      for="date"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <label
                      for="time"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Time
                    </label>
                    <input
                      type="time"
                      name="time"
                      id="time"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <label className="mb-3 block text-base font-medium text-[#07074D]">
                  Are you coming to the event?
                </label>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="radio1"
                      id="radioButton1"
                      className="h-5 w-5"
                    />
                    <label
                      for="radioButton1"
                      className="pl-3 text-base font-medium text-[#07074D]"
                    >
                      Yes
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="radio1"
                      id="radioButton2"
                      className="h-5 w-5"
                    />
                    <label
                      for="radioButton2"
                      className="pl-3 text-base font-medium text-[#07074D]"
                    >
                      No
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div> 
      </div> */}
      {/* MAKE AN ANNOUNCE */}
      <div className="container px-11 pt-11">
        <h1 className="text-gray-800 text-2xl">
          Faire une annonce pour cette randonnée
        </h1>
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

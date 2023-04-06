import {
  IconButton,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PreviewIcon from "@mui/icons-material/Preview";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import moment from "moment";
const OrganizerView = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  // TODO DELETE RANDOS ON TRASHICON CLICK
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/pins/organizer/${currentUser.details.username}`,
          { withCredentials: true }
        );
        setData(res.data);
        setCount(res.data.length);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8800/api/pins/${id}`, {
        withCredentials: true,
      });
      setOpen(false);
      setData(data.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!currentUser.isOrg && (
        <h1 className="text-2xl text-red-500 text-cener font-semibold">
          Vous n'avez pas l'access a cette page
        </h1>
      )}
      {currentUser.isOrg && (
        <>
          {data.length === 0 && (
            <div className="flex justify-center mt-20">
              <div className="flex flex-col items-center gap-3">
                <h1 className="text-2xl font-semibold text-gray-800">
                  Vous n'avez pas encore créé de randonnée
                </h1>
                <button
                  onClick={() => {
                    navigate("/organizer");
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Créer une randonnée
                </button>
              </div>
            </div>
          )}
          <div className="h-screen">
            {data.length !== 0 && (
              <>
                <h1 className="text-center text-gray-800 text-xl font-semibold mt-16">
                  Mes Randonées
                </h1>
                <div className="mx-4 flex justify-center">
                  <Table className="shadow-lg mt-10" style={{ width: "70%" }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Nom</TableCell>
                        <TableCell>Places restantes</TableCell>
                        <TableCell>Prix</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((row) => (
                        <TableRow hover="true">
                          <TableCell>
                            {moment(row.createdAt).format("LL")}
                          </TableCell>
                          <TableCell>{row.title}</TableCell>
                          <TableCell>{row.places}</TableCell>
                          <TableCell>{row.price} DZD</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <IconButton
                                onClick={() => {
                                  setOpen(true);
                                }}
                              >
                                <DeleteForeverIcon className="text-red-600" />
                              </IconButton>
                              <Dialog
                                open={open}
                                keepMounted
                                onClose={handleClose}
                              >
                                <DialogTitle>
                                  {"Supprimer la randonnée?"}
                                </DialogTitle>
                                <DialogContent>
                                  <DialogContentText>
                                    Vous supprimez cette randonnée. Êtes-vous
                                    sûr?
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleClose}>ANNULER</Button>
                                  <Button onClick={() => handleDelete(row._id)}>
                                    ACCEPTER
                                  </Button>
                                </DialogActions>
                              </Dialog>
                              <IconButton
                                onClick={() => {
                                  navigate("/organizer/overview/" + row._id);
                                }}
                              >
                                <PreviewIcon className="text-blue-500" />
                              </IconButton>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default OrganizerView;

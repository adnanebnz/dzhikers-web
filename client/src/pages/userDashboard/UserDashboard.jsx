import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../Components/Loading";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import moment from "moment";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
const UserDashboard = () => {
  const [open, setOpen] = useState(false);
  const [openPin, setOpenPin] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenPin = () => {
    setOpenPin(true);
  };

  const handleClosePin = () => {
    setOpenPin(false);
  };
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://dzhikers.onrender.com/api/orders/${id}`,
        {
          withCredentials: true,
        }
      );
      const resPins = await axios.get(
        `https://dzhikers.onrender.com/api/reservations/${id}`,
        {
          withCredentials: true,
        }
      );
      setPins(resPins.data);
      setData(res.data);
      setLoading(false);
    };
    fetchData();
  }, [id]);
  const deleteOrder = async (order) => {
    try {
      await axios.delete(`https://dzhikers.onrender.com/api/orders/${order}`, {
        withCredentials: true,
      });
      setOpen(false);
      setData(data.filter((item) => item._id !== order));
    } catch (err) {
      console.log(err);
    }
  };
  const deleteReservation = async (reservation) => {
    try {
      await axios.delete(
        `https://dzhikers.onrender.com/api/reservations/${reservation}`,
        {
          withCredentials: true,
        }
      );
      setOpenPin(false);
      setPins(pins.filter((item) => item._id !== reservation));
    } catch (err) {
      console.log(err);
    }
  };
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

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
        <div className="mx-4  mt-11 mb-11 lg:mx-36">
          {loading && <Loading />}
          {!loading && (
            <>
              <h1 className="text-2xl font-semibold text-center mb-10">
                TABLEAU DE BORD
              </h1>
              {data.length === 0 && pins.length === 0 && (
                <h1 className="my-10 text-center text-gray-700 text-lg">
                  Rien a afficher
                </h1>
              )}
              {data.length !== 0 && (
                <>
                  <Table className="shadow-lg">
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Produits</TableCell>
                        <TableCell align="left">Total</TableCell>
                        <TableCell>Status de delivrance</TableCell>
                        <TableCell>Status de paiement</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((row) => (
                        <TableRow hover="true">
                          <TableCell>
                            {moment(row.createdAt).format("DD-MM-YYYY HH:mm ")}
                          </TableCell>
                          {row.products.map((product) => (
                            <div key={product._id}>
                              <TableCell>
                                {product.title} ({product.count})
                              </TableCell>
                            </div>
                          ))}

                          <TableCell>{row.total} د.ج</TableCell>

                          <TableCell>
                            {row.delivery_status === "pending" && (
                              <Typography
                                color="error"
                                size="small"
                                textAlign="center"
                              >
                                En cours de traitement
                              </Typography>
                            )}
                            {row.delivery_status === "shipping" && (
                              <Typography
                                className="text-amber-500"
                                size="small"
                                textAlign="center"
                              >
                                En cours d'expédition
                              </Typography>
                            )}
                            {row.delivery_status === "done" && (
                              <Typography
                                className="text-green-600"
                                size="small"
                                textAlign="center"
                              >
                                Livrée
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell>
                            {row.payment_status === "not_payed" && (
                              <Typography
                                color="error"
                                size="small"
                                textAlign="center"
                              >
                                Non payée
                              </Typography>
                            )}
                            {row.payment_status === "payed" && (
                              <Typography
                                className="text-green-600"
                                size="small"
                                textAlign="center"
                              >
                                Payée
                              </Typography>
                            )}
                          </TableCell>

                          <TableCell>
                            {row.payment_status === "not_payed" && (
                              <IconButton>
                                <DeleteForeverIcon
                                  sx={{ color: "tomato" }}
                                  onClick={handleClickOpen}
                                />
                              </IconButton>
                            )}
                            <Dialog
                              open={open}
                              keepMounted
                              onClose={handleClose}
                            >
                              <DialogTitle>
                                {"Annuler votre commande?"}
                              </DialogTitle>
                              <DialogContent>
                                <DialogContentText>
                                  Vous annulerez votre commande. Êtes-vous sûr?
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleClose}>ANNULER</Button>
                                <Button onClick={() => deleteOrder(row._id)}>
                                  ACCEPTER
                                </Button>
                              </DialogActions>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </>
              )}
            </>
          )}
          {pins.length !== 0 && (
            <>
              <Table className="shadow-lg mt-10">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Réservation</TableCell>
                    <TableCell>Prix</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pins.map((row) => (
                    <TableRow hover="true">
                      <TableCell>
                        {moment(row.date).format("DD-MM-YYYY HH:mm ")}
                      </TableCell>
                      <TableCell>{row.hikeTitle}</TableCell>

                      <TableCell>{row.price} DZD</TableCell>
                      <TableCell>
                        <IconButton>
                          <DeleteForeverIcon
                            sx={{ color: "tomato" }}
                            onClick={handleClickOpenPin}
                          />
                        </IconButton>
                        <Dialog
                          open={openPin}
                          keepMounted
                          onClose={handleClosePin}
                        >
                          <DialogTitle>
                            {"Annuler votre Réseration?"}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                              Vous annulerez votre réservation. Êtes-vous sûr?
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClosePin}>ANNULER</Button>
                            <Button onClick={() => deleteReservation(row._id)}>
                              ACCEPTER
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default UserDashboard;

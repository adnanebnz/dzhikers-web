import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../Components/Loading";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import moment from "moment";
import {
  IconButton,
  Table,
  Box,
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
const OrdersViewer = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [shipping, setShipping] = useState("pending");
  const [payed, setPayed] = useState("not payed");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const resultat = await axios.get("http://localhost:8800/api/orders", {
          withCredentials: true,
        });
        setOrders(resultat.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, []);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/orders/admin/${id}`, {
        withCredentials: true,
      });
      setOrders(orders.filter((order) => order._id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (id) => {
    try {
      await axios.put(
        `http://localhost:8800/api/orders/${id}`,
        {
          delivery_status: shipping,
          payment_status: payed,
        },
        {
          withCredentials: true,
        }
      );
      setOrders(
        orders.map((order) =>
          order._id === id ? { ...order, shipping, payed } : order
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box padding="30px">
      {loading && <Loading />}
      {!loading && (
        <>
          {orders.length === 0 && (
            <Typography textAlign="center" marginTop="10px" marginBottom="10px">
              Auccune commande est faite
            </Typography>
          )}
          {orders.length !== 0 && (
            <>
              <Table className="shadow-lg">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Produit / Réservation</TableCell>
                    <TableCell align="left">Total</TableCell>
                    <TableCell>Status de delivrance</TableCell>
                    <TableCell>Status de paiement</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((row) => (
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
                        <select
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          onChange={(e) => {
                            setShipping(e.target.value);
                          }}
                        >
                          <option value="pending">
                            En cours de traitement
                          </option>
                          <option value="shipping">
                            En cours d'expedition
                          </option>
                          <option value="done">Livrée</option>
                        </select>
                      </TableCell>
                      <TableCell>
                        <select
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          onChange={(e) => {
                            setPayed(e.target.value);
                          }}
                        >
                          <option value="payed">Payé</option>
                          <option value="not_payed">Non payé</option>
                        </select>
                      </TableCell>

                      <TableCell>
                        <IconButton
                          onClick={() => {
                            handleUpdate(row._id);
                          }}
                        >
                          <CheckCircleIcon sx={{ color: "green" }} />
                        </IconButton>
                        <IconButton>
                          <DeleteForeverIcon
                            sx={{ color: "red" }}
                            onClick={handleClickOpen}
                          />
                        </IconButton>
                        <Dialog open={open} keepMounted onClose={handleClose}>
                          <DialogTitle>{"Annuler votre commande?"}</DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                              Vous annulerez votre commande. Êtes-vous sûr?
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose}>ANNULER</Button>
                            <Button
                              onClick={() => {
                                handleDelete(row._id);
                                handleClose();
                              }}
                            >
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
    </Box>
  );
};

export default OrdersViewer;

import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../Components/Loading";
import { Container } from "@mui/system";
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
  console.log(orders);
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
                        {row.payment_status === "not payed" && (
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
                        {row.payment_status === "not payed" && (
                          <IconButton>
                            <DeleteForeverIcon
                              sx={{ color: "tomato" }}
                              onClick={handleClickOpen}
                            />
                          </IconButton>
                        )}
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
                              onClick={() => alert("DID YOU JUST PRESS ME?")}
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

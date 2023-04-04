import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../Components/Loading";
import EditIcon from "@mui/icons-material/Edit";
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
  Stack,
  Button,
  Pagination,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
const ProductsViewer = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [itemCount, setItemCount] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const resultat = await axios.get(
          `http://localhost:8800/api/items?category=all&page=${page}&min=0&max=1000000`,
          {
            withCredentials: true,
          }
        );
        setProducts(resultat.data.items);
        setItemCount(resultat.data.count);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/items/${id}`, {
        withCredentials: true,
      });
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box marginTop="10px">
      <Box
        sx={{
          display: "flex",
          alignItems: "end",
          justifyContent: "end",
          padding: "20px",
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            navigate("/admin/ajouter-produit");
          }}
        >
          Ajouter un produit
        </Button>
      </Box>
      {loading && <Loading />}
      {!loading && (
        <>
          {products.length === 0 && (
            <Typography textAlign="center" marginTop="10px" marginBottom="10px">
              Vous n'avez pas ajouté un produit
            </Typography>
          )}
          {products.length !== 0 && (
            <>
              <Table className="shadow-lg">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Date de creation</TableCell>
                    <TableCell align="center">Image</TableCell>
                    <TableCell align="center">Produit</TableCell>
                    <TableCell align="left">Quantité</TableCell>
                    <TableCell align="center">Catégorie</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((row) => (
                    <TableRow hover="true">
                      <TableCell>
                        {moment(row.createdAt).format("DD-MM-YYYY HH:mm ")}
                      </TableCell>
                      <TableCell>
                        <img src={row.img3} height="80px" width="80px" />
                      </TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell align="center">{row.quantity}</TableCell>
                      <TableCell align="center">{row.category}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing="5px">
                          <IconButton
                            color="primary"
                            aria-label="Modifier"
                            component="span"
                          >
                            <EditIcon color="success" />
                          </IconButton>
                          <IconButton
                            color="primary"
                            aria-label="Modifier"
                            component="span"
                            onClick={handleClickOpen}
                          >
                            <DeleteForeverIcon color="error" />
                          </IconButton>
                        </Stack>
                        <Dialog open={open} keepMounted onClose={handleClose}>
                          <DialogTitle>{"Supprimer ce produit?"}</DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                              Vous supprimez ce produit. Êtes-vous sûr?
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
      {products.length !== 0 && (
        <Pagination
          count={Math.ceil(itemCount / 12)}
          shape="rounded"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "4rem",
          }}
          onChange={(e) => {
            setPage(e.target.textContent);
          }}
        />
      )}
    </Box>
  );
};

export default ProductsViewer;

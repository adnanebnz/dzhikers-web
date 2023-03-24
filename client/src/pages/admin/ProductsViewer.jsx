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
} from "@mui/material";
const ProductsViewer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const resultat = await axios.get("http://localhost:8800/api/items", {
          withCredentials: true,
        });
        setProducts(resultat.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);
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
        <Button variant="contained">Ajouter un produit</Button>
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
                        <img src={row.img} height="80px" width="80px" />
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
                          >
                            <DeleteForeverIcon color="error" />
                          </IconButton>
                        </Stack>
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

export default ProductsViewer;

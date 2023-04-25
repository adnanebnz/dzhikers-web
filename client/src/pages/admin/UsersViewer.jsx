import { useEffect, useState } from "react";
import axios from "axios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Loading from "../../Components/Loading";
const UsersViewer = () => {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const resultat = await axios.get("http://localhost:8800/api/users", {
          withCredentials: true,
        });
        setUsers(resultat.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/users/${id}`, {
        withCredentials: true,
      });
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" mt-7">
      <h1 className="text-xl font-semibold mb-7 text-gray-700">Utilisateurs</h1>
      <div className="flex items-center justify-end mb-3">
        <Button
          variant="contained"
          onClick={() => {
            navigate("/admin/ajouter-utilisateur");
          }}
        >
          Créer un utilisateur
        </Button>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Table className="shadow-lg">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Organisateur</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id} hover={true}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.isOrg ? "Oui" : "Non"}</TableCell>
                  <TableCell>{user.isAdmin ? "Oui" : "Non"}</TableCell>
                  <TableCell>
                    <IconButton onClick={handleClickOpen}>
                      <DeleteForeverIcon sx={{ color: "red" }} />
                    </IconButton>
                    <Dialog open={open} keepMounted onClose={handleClose}>
                      <DialogTitle>{"Supprimer cet utilisateur?"}</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Vous supprimez cet utilisateur. Êtes-vous sûr?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>ANNULER</Button>
                        <Button
                          onClick={() => {
                            handleDelete(user._id);
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
        </div>
      )}
    </div>
  );
};

export default UsersViewer;

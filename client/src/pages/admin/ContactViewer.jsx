import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import {
  IconButton,
  Table,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import DeleteForever from "@mui/icons-material/DeleteForever";
import { Box } from "@mui/system";
const ContactViewer = () => {
  const [contact, setContact] = useState([]);
  useEffect(() => {
    const fetchContact = async () => {
      const res = await axios.get(
        "https://dzhikers-web-production.up.railway.app/api/messages",
        {
          withCredentials: true,
        }
      );
      setContact(res.data);
    };
    fetchContact();
  }, []);
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://dzhikers-web-production.up.railway.app/api/messages/${id}`,
        {
          withCredentials: true,
        }
      );
      setContact(contact.filter((msg) => msg._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mt-7" style={{ overflow: "hidden" }}>
      {contact.length === 0 && (
        <h1 className="text-xl font-semibold mb-7 text-gray-700">
          Aucun message de contact
        </h1>
      )}
      {contact.length > 0 && (
        <>
          <h1 className="text-xl font-semibold mb-7 text-gray-700">
            Messages de contact
          </h1>

          <Table className="shadow-lg">
            <TableHead>
              <TableRow>
                <TableCell align="center">Date d'envoi</TableCell>
                <TableCell>Nom et prénom</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Message</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            {contact.map((c) => (
              <TableRow hover="true">
                <TableCell>
                  {moment(c.createdAt).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell>
                  {c.firstName} {c.lastName}
                </TableCell>
                <TableCell>{c.email}</TableCell>
                <TableCell>
                  {c.msg.length > 50 ? c.msg.substring(0, 50) + "..." : c.msg}
                </TableCell>
                <TableCell align="center">
                  <Box>
                    <IconButton
                      onClick={() => {
                        handleDelete(c._id);
                      }}
                    >
                      <DeleteForever color="error" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </>
      )}
    </div>
  );
};
export default ContactViewer;

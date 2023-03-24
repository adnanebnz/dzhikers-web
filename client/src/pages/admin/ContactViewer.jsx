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
      const res = await axios.get("http://localhost:8800/api/messages");
      setContact(res.data);
    };
    fetchContact();
  }, []);
  console.log(contact);
  return (
    <div className="py-5" style={{ overflow: "hidden" }}>
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
            <TableCell>{moment(c.createdAt).format("DD/MM/YYYY")}</TableCell>
            <TableCell>
              {c.firstName} {c.lastName}
            </TableCell>
            <TableCell>{c.email}</TableCell>
            <TableCell>
              {c.msg.length > 50 ? c.msg.substring(0, 50) + "..." : c.msg}
            </TableCell>
            <TableCell align="center">
              <Box>
                <IconButton>
                  <ReadMoreIcon color="primary" />
                </IconButton>
                <IconButton>
                  <DeleteForever color="error" />
                </IconButton>
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </div>
  );
};
export default ContactViewer;

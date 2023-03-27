import {
  IconButton,
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
  return (
    <>
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
                          <IconButton>
                            <DeleteForeverIcon className="text-red-600" />
                          </IconButton>
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
  );
};

export default OrganizerView;

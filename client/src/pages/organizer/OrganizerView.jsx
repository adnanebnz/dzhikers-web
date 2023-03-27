import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../Components/Loading";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import moment from "moment";
const OrganizerView = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/reservations/organizer/${currentUser.details.username}`,
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
        {/* CARDS */}
        <div className="flex justify-center  bg-gray-50 py-10 p-14  mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-9 ">
            <div className=" bg-white  rounded-sm  shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
              <div className="h-20 bg-red-400 flex items-center justify-between">
                <p className="mr-0 text-white text-lg pl-5">
                  Randonnées hébergées
                </p>
              </div>
              <div className="flex justify-between px-5 pt-6 mb-2 text-sm text-gray-600">
                <p>TOTAL</p>
              </div>
              <p className="py-4 text-3xl ml-5">10</p>
              <hr />
            </div>

            <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
              <div className="h-20 bg-blue-500 flex items-center justify-between">
                <p className="mr-0 text-white text-lg pl-5">
                  Participants total
                </p>
              </div>
              <div className="flex justify-between px-5 pt-6 mb-2 text-sm text-gray-600">
                <p>TOTAL</p>
              </div>
              <p className="py-4 text-3xl ml-5">{count}</p>
              <hr />
            </div>

            <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
              <div className="h-20 bg-purple-400 flex items-center justify-between">
                <p className="mr-0 text-white text-lg pl-5">
                  Total des revenus
                </p>
              </div>
              <div className="flex justify-between pt-6 px-5 mb-2 text-sm text-gray-600">
                <p>TOTAL</p>
              </div>
              <p className="py-4 text-3xl ml-5">78000 DZD</p>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganizerView;

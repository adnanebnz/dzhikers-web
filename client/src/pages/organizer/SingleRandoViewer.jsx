import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
const SingleRandoViewer = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [participants, setParticipants] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/reservations/${id}/details`
        );
        setData(res.data.reservations);
        setParticipants(res.data.participants);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  const totalIncomes = data.reduce((acc, curr) => {
    return acc + curr.price;
  }, 0);
  const totalParticipants = data.length;
  return (
    <div className="h-full">
      {data.length === 0 && (
        <h1 className="text-xl text-center mt-20 h-screen">
          Rien a afficher pour le momment
        </h1>
      )}
      {data.length !== 0 && (
        <div className="flex justify-center  py-10 p-14  mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-9 ">
            <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
              <div className="h-20 bg-blue-500 flex items-center justify-between">
                <p className="mr-0 text-white text-lg pl-5">
                  Participants total
                </p>
              </div>
              <div className="flex justify-between px-5 pt-6 mb-2 text-sm text-gray-600">
                <p>TOTAL</p>
              </div>
              <p className="py-4 text-3xl ml-5">{totalParticipants}</p>
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
              <p className="py-4 text-3xl ml-5">{totalIncomes} DZD</p>
              <hr />
            </div>
          </div>
        </div>
      )}
      {data.length !== 0 && (
        <>
          <div className="container px-11">
            <h1 className="text-gray-800 text-2xl">Participants :</h1>
          </div>
          <div className="flex items-center justify-center">
            <Table
              className="shadow-lg mt-3 overflow-hidden mb-5"
              sx={{ width: "40%" }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>Nom</TableCell>
                  <TableCell>Prénom</TableCell>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {participants.map((row) => (
                  <TableRow hover="true">
                    <TableCell>{row.firstName}</TableCell>
                    <TableCell>{row.lastName}</TableCell>
                    <TableCell>{row.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
      {/* <div className="container px-11 pt-11">
        <h1 className="text-gray-800 text-2xl">
          Modifier les informations de la randonnée
        </h1>

        <div class="flex items-center justify-center p-12">
          <div class="mx-auto w-full max-w-[550px]">
            <form action="https://formbold.com/s/FORM_ID" method="POST">
              <div class="-mx-3 flex flex-wrap">
                <div class="w-full px-3 sm:w-1/2">
                  <div class="mb-5">
                    <label
                      for="fName"
                      class="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="fName"
                      id="fName"
                      placeholder="First Name"
                      class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
                <div class="w-full px-3 sm:w-1/2">
                  <div class="mb-5">
                    <label
                      for="lName"
                      class="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lName"
                      id="lName"
                      placeholder="Last Name"
                      class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
              </div>
              <div class="mb-5">
                <label
                  for="guest"
                  class="mb-3 block text-base font-medium text-[#07074D]"
                >
                  How many guest are you bringing?
                </label>
                <input
                  type="number"
                  name="guest"
                  id="guest"
                  placeholder="5"
                  min="0"
                  class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              <div class="-mx-3 flex flex-wrap">
                <div class="w-full px-3 sm:w-1/2">
                  <div class="mb-5">
                    <label
                      for="date"
                      class="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
                <div class="w-full px-3 sm:w-1/2">
                  <div class="mb-5">
                    <label
                      for="time"
                      class="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Time
                    </label>
                    <input
                      type="time"
                      name="time"
                      id="time"
                      class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
              </div>

              <div class="mb-5">
                <label class="mb-3 block text-base font-medium text-[#07074D]">
                  Are you coming to the event?
                </label>
                <div class="flex items-center space-x-6">
                  <div class="flex items-center">
                    <input
                      type="radio"
                      name="radio1"
                      id="radioButton1"
                      class="h-5 w-5"
                    />
                    <label
                      for="radioButton1"
                      class="pl-3 text-base font-medium text-[#07074D]"
                    >
                      Yes
                    </label>
                  </div>
                  <div class="flex items-center">
                    <input
                      type="radio"
                      name="radio1"
                      id="radioButton2"
                      class="h-5 w-5"
                    />
                    <label
                      for="radioButton2"
                      class="pl-3 text-base font-medium text-[#07074D]"
                    >
                      No
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <button class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div> 
      </div> */}
    </div>
  );
};

export default SingleRandoViewer;

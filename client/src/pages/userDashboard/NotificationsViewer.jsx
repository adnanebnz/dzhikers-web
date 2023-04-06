import axios from "axios";
import moment from "moment";
import { Avatar } from "@mui/material";
import { useState, useEffect } from "react";
import { IoNotificationsSharp as IoMdNotifications } from "react-icons/io5";
const NotificationsViewer = () => {
  moment.locale("fr");
  const [notifications, setNotifications] = useState([]);
  const [hikeInfos, setHikeInfos] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    const fetchNotifs = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/announces/notifs/${currentUser.details._id}`,
          {
            withCredentials: true,
          }
        );
        setNotifications(res.data.announces);
        setHikeInfos(res.data.hikeInfos);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotifs();
  }, []);
  return (
    <>
      {notifications.length === 0 && (
        <h1 className="text-center text-2xl text-gray-700 font-semibold mt-10 h-screen">
          Rien a afficher
        </h1>
      )}
      {notifications.length > 0 && (
        <div className="h-screen container p-10 mt-5 mb-5">
          <div className="flex items-center gap-2 mb-3">
            <h1 className="underline  decoration-sky-600 hover:decoration-blue-500 hover:transition text-2xl font-semibold underline-offset-8 text-gray-700">
              Notifications
            </h1>
            <IoMdNotifications size={20} className="mt-3 text-gray-700" />
          </div>
          {notifications.map((notif) => (
            <div className="bg-white max-w-full rounded-2xl px-5 py-8 shadow-lg hover:shadow-2xl transition duration-500 mb-3">
              <div className="flex flex-col gap-4">
                <div>
                  {hikeInfos.map((hike) =>
                    hike._id === notif.hikeId ? (
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <Avatar
                          src={hike.img}
                          sx={{ width: "65px", height: "65px" }}
                        />
                        <h1 className="text-lg sm:text-xl font-semibold">
                          {hike.title}
                        </h1>

                        <h1 className=" text-md text-gray-700">
                          Prévu le {moment(hike.date).format("LLL")}
                        </h1>
                      </div>
                    ) : null
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="text-lg text-gray-800 font-medium">
                    {notif.title}
                  </h1>
                  <p className="text-md text-gray-700">{notif.description}</p>
                  <h1 className="text-sm text-gray-600">
                    {moment(notif.createdAt).fromNow()}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default NotificationsViewer;

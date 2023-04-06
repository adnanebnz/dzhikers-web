import { useState } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import { Alert, Snackbar } from "@mui/material";

export default function AddUser() {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("user");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(true);
  const [isOrg, setIsOrg] = useState(false);
  const onOptionChange = (e) => {
    switch (e.target.value) {
      case "admin":
        setIsAdmin(true);
        setIsUser(false);
        setIsOrg(false);
        break;
      case "user":
        setIsAdmin(false);
        setIsUser(true);
        setIsOrg(false);
        break;
      case "org":
        setIsAdmin(false);
        setIsUser(false);
        setIsOrg(true);
        break;
      default:
        setIsAdmin(false);
        setIsUser(true);
        setIsOrg(false);
        break;
    }
    setRole(e.target.value);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      username: data.get("username"),
      email: data.get("email"),
      age: data.get("age"),
      password: data.get("password"),
      isAdmin: isAdmin,
      isUser: isUser,
      isOrg: isOrg,
    };

    try {
      await axios.post("http://localhost:8800/api/users/register", values);
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-lg mx-auto mt-10 mb-10">
      <h1 className="mb-3 text-lg text-gray-700 font-semibold">
        Ajouter un utulisateur
      </h1>
      <form
        className="bg-gray-200 shadow-xl rounded px-8 pt-6 pb-8 mb-6"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="name"
              >
                Nom
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Nom*"
                name="lastName"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="name"
              >
                Prénom
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Prénom*"
                name="firstName"
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="description"
          >
            Nom d'utulisateur
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Nom d'utulisateur*"
            name="username"
            type="text"
          />
        </div>
        <h1 className="block text-gray-700 font-bold mb-2">Age</h1>
        <div className="flex items-center gap-3 mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="number"
            placeholder="Age*"
            name="age"
          />
        </div>

        <div className="mb-4">
          <h1 className="block text-gray-700 font-bold mb-2">Role</h1>
          <div className="flex items-center gap-6 justify-center">
            <div>
              <input
                type="radio"
                name="role"
                value="user"
                onChange={onOptionChange}
              />
              <label className="text-gray-700 font-bold mb-2">User</label>
            </div>
            <div>
              <input
                type="radio"
                name="role"
                value="admin"
                onChange={onOptionChange}
              />
              <label className="text-gray-700 font-bold mb-2">Admin</label>
            </div>
            <div>
              <input
                type="radio"
                name="role"
                value="org"
                onChange={onOptionChange}
              />
              <label className="text-gray-700 font-bold mb-2">
                Organisateur
              </label>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="description"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Email*"
            name="email"
            type="text"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="description"
          >
            Mot de passe
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Mot dz passe*"
            name="password"
            type="password"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="px-2 py-1 bg-blue-500 rounded-md text-white font-semibold
            hover:bg-blue-600 hover:transition-all duration-100"
          >
            Ajouter l'utulisateur
          </button>
        </div>
      </form>
      {open && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Utulisateur crée avec success!
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}

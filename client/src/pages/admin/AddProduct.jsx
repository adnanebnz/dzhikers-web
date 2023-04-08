import { useState } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import { Alert, Snackbar } from "@mui/material";
export default function AddProduct() {
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleDrop = (acceptedFiles) => {
    setImages(acceptedFiles);
    setImagesPreview(acceptedFiles.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.set("title", title);
    data.set("desc", desc);
    data.set("price", price);
    data.set("quantity", quantity);
    data.set("brand", brand);
    data.set("category", category);

    images.forEach((file) => {
      data.append("images", file);
    });

    try {
      await axios.post("https://dzhikers.onrender.com/api/items", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <>
      {!currentUser.isAdmin && (
        <h1 className="text-center text-2xl text-red-500 font-semibold mt-10">
          Vous n'avez pas accès à cette page
        </h1>
      )}
      {currentUser.isAdmin && (
        <div className="max-w-lg mx-auto mt-10 mb-10">
          <h1 className="mb-3 text-lg text-gray-700 font-semibold">
            Ajouter un produit
          </h1>
          <form
            className="bg-gray-200 shadow-xl rounded px-8 pt-6 pb-8 mb-6"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="name"
              >
                Titre
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Nom du produit"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                placeholder="Description du produit"
                name="desc"
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-4 flex items-center justify-around gap-4">
              <h1 className="block text-gray-700 font-bold">Marque</h1>
              <h1 className="block text-gray-700 font-bold">Catégorie</h1>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="price"
                type="text"
                placeholder="Marque du produit"
                name="brand"
                onChange={(e) => setBrand(e.target.value)}
              />

              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="tantes">Tantes</option>
                <option value="chaises">Chaises</option>
                <option value="gourdes">Gourdes</option>
                <option value="vetements">Vetements</option>
              </select>
            </div>

            <div className="mb-4">
              <div className="mb-4 flex items-center justify-around gap-4">
                <h1 className="block text-gray-700 font-bold">Prix</h1>
                <h1 className="block text-gray-700 font-bold">Stock</h1>
              </div>
              <div className="flex items-center gap-3">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="price"
                  type="number"
                  placeholder="Prix du produit"
                  name="price"
                  onChange={(e) => setPrice(e.target.value)}
                />

                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="quantity"
                  type="number"
                  placeholder="Quantité du produit"
                  name="quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="image"
              >
                Images du produit
              </label>
              <div className="border border-solid border-blue-500 p-4">
                <Dropzone onDrop={handleDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p className="text-gray-700 font-semibold text-sm text-center">
                        Faites glisser pour déposez vos images ici, ou
                        simplement cliquez ici.
                      </p>
                    </div>
                  )}
                </Dropzone>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mb-4">
              {imagesPreview.map((image) => (
                <div>
                  <img
                    alt="image"
                    className="w-32 h-32 object-cover rounded-md"
                    src={image}
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="px-2 py-1 bg-blue-500 rounded-md text-white font-semibold
           hover:bg-blue-600 hover:transition-all duration-100"
              >
                Ajouter le produit
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
                Produit Ajoutée avec success!
              </Alert>
            </Snackbar>
          )}
        </div>
      )}
    </>
  );
}

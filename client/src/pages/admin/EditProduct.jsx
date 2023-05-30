import { useState } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import { useParams } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
export default function EditProduct() {
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [imagesPreview, setImagesPreview] = useState([]);
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

    try {
      await axios.put(
        `https://dzhikers-web-production.up.railway.app/api/items/${id}`,
        {
          title,
          desc,
          brand,
          category,
          price,
          quantity,
        }
      );
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePicturesChange = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    images.forEach((file) => {
      data.append("images", file);
    });
    try {
      await axios.put(
        `https://dzhikers-web-production.up.railway.app/api/items/images/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setOpen(true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <h1 className="mb-3 text-xl text-gray-700 font-semibold text-center mt-16">
        Modifier le produit
      </h1>
      <div className="mt-10 mb-10 flex  flex-col items-center justify-center sm:items-start sm:flex-row gap-10 sm:px-7">
        <div className="w-4/5 sm:w-2/5">
          <form onSubmit={handlePicturesChange}>
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
                      Faites glisser pour déposez vos images ici, ou simplement
                      cliquez ici.
                    </p>
                  </div>
                )}
              </Dropzone>
            </div>
            <div className="flex items-center justify-center gap-4 mb-4 mt-4">
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
            <button
              type="submit"
              className="px-2 py-1 bg-blue-500 rounded-md text-white font-semibold
            hover:bg-blue-600 hover:transition-all duration-100 mt-4"
            >
              Mettre a jour les photos du produit
            </button>
          </form>
        </div>
        <form
          className="bg-gray-200 shadow-xl rounded px-8 pt-6 pb-8 mb-6  w-4/5 sm:w-3/5"
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

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-2 py-1 bg-blue-500 rounded-md text-white font-semibold
            hover:bg-blue-600 hover:transition-all duration-100"
            >
              Mettre a jour le produit
            </button>
          </div>
        </form>
      </div>
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
            Produit mis a jour avec success!
          </Alert>
        </Snackbar>
      )}
    </>
  );
}

import { useState } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
export default function AddProduct() {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(null);

  const handleDrop = (acceptedFiles) => {
    setImages(acceptedFiles);
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
    data.set("rating", rating);

    images.forEach((file) => {
      data.append("images", file);
    });

    try {
      await axios.post("http://localhost:8800/api/items", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-lg mx-auto">
      <form
        className="bg-gray-200 shadow-xl rounded px-8 pt-6 pb-8 mb-6"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
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

          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="text"
            placeholder="Catégorie du produit"
            name="category"
            onChange={(e) => setCategory(e.target.value)}
          />
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
          <label className="block text-gray-700 font-bold mb-2" htmlFor="image">
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
    </div>
  );
}

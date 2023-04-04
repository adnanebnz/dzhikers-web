import { useState } from "react";
import axios from "axios";
export default function AddProduct() {
  const [imageOne, setImageOne] = useState(null);
  const [imageTwo, setImageTwo] = useState(null);
  const [imageThree, setImageThree] = useState(null);
  const handleFilesSelect = (event) => {
    //set selected files
    setImageOne(event.target.file[0]);
    setImageTwo(event.target.file[1]);
    setImageThree(event.target.file[2]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const name = data.get("title");
    const desc = data.get("desc");
    const price = data.get("price");
    const quantity = data.get("quantity");
    const brand = data.get("brand");
    const category = data.get("category");
    const rating = data.get("rating");
    try {
      await axios.post(
        "http://localhost:8800/api/items",
        {
          name,
          desc,
          price,
          quantity,
          brand,
          category,
          rating,
          images: [imageOne, imageTwo, imageThree],
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  console.log(imageOne, imageTwo, imageThree);
  return (
    <div className="max-w-md mx-auto">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
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
            placeholder="Product name"
            name="title"
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
            placeholder="Product description"
            name="desc"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
            Marque
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="text"
            placeholder="Marque du produit"
            name="brand"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
            Catégorie
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="text"
            placeholder="Catégorie du produit"
            name="category"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
            Note
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="number"
            placeholder="Note du produit sur 5"
            name="rating"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="number"
            placeholder="Product price"
            name="price"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="quantity"
          >
            Quantity
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="quantity"
            type="number"
            placeholder="Product quantity"
            name="quantity"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="image">
            Product Cover
          </label>
          <input
            className="w-full"
            type="file"
            name="images"
            required
            onChange={handleFilesSelect}
            multiple
          />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="px-2 py-1 bg-blue-500 rounded-md">
            <span className="text-white font-bold">Add Product</span>
          </button>
        </div>
      </form>
    </div>
  );
}

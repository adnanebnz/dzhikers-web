import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import StarIcon from "@mui/icons-material/Star";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { addToCart } from "../../state";
const Shop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(1);
  const [itemCount, setItemCount] = useState(0);
  const [category, setCategory] = useState("all");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/items?category=${category}`
        );
        setItems(res.data);
        setItemCount(res.data.length);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [category]);
  console.log(items);
  return (
    <section className="bg-white mt-24 mb-20 h-screen">
      <div className="container px-6 py-8 mx-auto">
        <div className="lg:flex lg:-mx-2">
          <div className="space-y-3 lg:w-1/5 lg:px-2 lg:space-y-4">
            <a
              onClick={() => setCategory("all")}
              className="block font-medium text-gray-500  hover:underline cursor-pointer"
            >
              Tout
            </a>
            <a
              onClick={() => setCategory("tantes")}
              className="block font-medium text-gray-500  hover:underline cursor-pointer"
            >
              Tantes
            </a>
            <a
              onClick={() => setCategory("chaises")}
              className="block font-medium text-gray-500 hover:underline cursor-pointer"
            >
              Chaises
            </a>
            <a
              onClick={() => setCategory("gourdes")}
              className="block font-medium text-gray-500  hover:underline cursor-pointer"
            >
              Gourdes
            </a>
            <a
              onClick={() => setCategory("vetements")}
              className="block font-medium text-gray-500  hover:underline cursor-pointer"
            >
              Vetements
            </a>
          </div>

          <div className="mt-6 lg:mt-0 lg:px-2 lg:w-4/5 ">
            <div className="flex items-center justify-between text-sm tracking-widest uppercase ">
              <p className="text-gray-500 ">{itemCount} Produits</p>
              <div className="flex items-center">
                <p className="text-gray-500 ">Filtrer</p>
                <select className="font-medium text-gray-700 bg-transparent  focus:outline-none">
                  <option value="#">Popularité</option>
                  <option value="#">Prix</option>
                </select>
              </div>
            </div>

            {/* ITEMS MAPPING  HERE */}
            <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-3">
              {items.map((item) => (
                <>
                  <div className="w-full h-screen flex justify-center">
                    <div>
                      <div className="w-auto">
                        <div className="shadow hover:shadow-lg transition duration-300 ease-in-out xl:mb-0 lg:mb-0 md:mb-0 mb-6 cursor-pointer group">
                          <div className="overflow-hidden relative">
                            <img
                              className="w-full transition duration-700 ease-in-out group-hover:opacity-60"
                              src={item.img3}
                              alt="image"
                            />
                            <div className="flex justify-center">
                              <div className="absolute bottom-4 transition duration-500 ease-in-out opacity-0 group-hover:opacity-100">
                                <a
                                  onClick={() => {
                                    dispatch(
                                      addToCart({
                                        item: { ...item, count },
                                      })
                                    );
                                  }}
                                  className="bg-gray-700 px-3 py-3 hover:bg-blue-500 transition duration-300 ease-in-out"
                                >
                                  <ShoppingCartIcon className="fas fa-shopping-cart transition duration-300 ease-in-out flex justify-center items-center text-gray-100" />
                                </a>

                                <a
                                  onClick={() => {
                                    navigate("/boutique/" + item._id);
                                  }}
                                  className="bg-gray-700 px-3 py-3 hover:bg-blue-500 transition duration-300 ease-in-out"
                                >
                                  <SearchIcon className="fas fa-search transition duration-300 ease-in-out flex justify-center items-center text-gray-100" />
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="px-4 py-3 bg-white">
                            <a
                              onClick={() => navigate("/boutique/" + item._id)}
                              className=""
                            >
                              <h1 className="text-gray-800 font-semibold text-lg hover:text-blue-500 transition duration-300 ease-in-out">
                                {item.title}
                              </h1>
                            </a>
                            <div className="flex py-2">
                              <p className="mr-2 text-lg text-gray-600">
                                {item.price} DZD
                              </p>
                            </div>
                            <div className="flex">
                              <div className="">
                                {Array(item.rating).fill(
                                  <StarIcon sx={{ color: "gold" }} />
                                )}
                              </div>
                              <div className="ml-2">
                                <p className="text-gray-500 font-medium text-sm">
                                  (1)
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;

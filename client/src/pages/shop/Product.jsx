import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import { Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useDispatch } from "react-redux";
import { addToCart } from "../../state";
import Loading from "../../Components/Loading";
import Comments from "../../Components/Comments";
const Product = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://busy-ruby-xerus-fez.cyclic.app/api/items/${id}`
      );
      setData(res.data);
      setLoading(false);
    };
    fetchData();
  }, [id]);
  console.log(data);
  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <Carousel
                autoPlay={true}
                autoFocus={true}
                emulateTouch={true}
                infiniteLoop={true}
              >
                <div>
                  <img src={data.img3} alt="" />
                </div>
                <div>
                  <img src={data.img2} alt="" />
                </div>
                <div>
                  <img src={data.img} alt="" className="rounded-lg" />
                </div>
              </Carousel>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
                {data.title}
              </h2>
              <p className="text-gray-500 text-sm">
                De{" "}
                <a href className="text-blue-600 hover:underline">
                  {data.brand}
                </a>
              </p>

              <div className="flex items-center space-x-4 my-4">
                <div>
                  <div className="rounded-lg bg-gray-100 flex gap-1 py-2 px-3">
                    <span className="font-bold text-blue-500 text-2xl">
                      {data.price}
                    </span>
                    <span className="text-blue-400 mr-1 mt-1 font-semibold">
                      DZD
                    </span>
                  </div>
                  {data.quantity === 0 && (
                    <h1 className="mt-2 text-red-700 text-lg font-semibold">
                      En rupture de stock
                    </h1>
                  )}
                  {data.quantity > 0 && (
                    <h1 className="mt-2 text-green-700 text-lg font-semibold">
                      En stock: {data.quantity}
                    </h1>
                  )}
                </div>
              </div>

              <p className="text-gray-500">{data.desc}</p>

              <div className="flex py-4 gap-7 items-center">
                <div className="flex flex-col gap-1">
                  <div className="px-2 text-xs uppercase text-gray-600 tracking-wide font-semibold">
                    Quantité
                  </div>
                  <div className="cursor-pointer rounded-xl border border-gray-200 pl-2 pr-2 h-14 flex items-end pb-1">
                    <div className="flex items-center">
                      <IconButton
                        onClick={() => setCount(Math.max(count - 1, 1))}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography color="black">{count}</Typography>
                      <IconButton
                        onClick={() => {
                          if (count < data.quantity) setCount(count + 1);
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="h-14 mt-6 px-4 font-semibold rounded-xl bg-blue-600 hover:bg-blue-500 text-white"
                  onClick={() => {
                    dispatch(addToCart({ item: { ...data, count } }));
                  }}
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <Comments />
          </div>
        </div>
      )}
    </>
  );
};

export default Product;

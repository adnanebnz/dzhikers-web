import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import Loading from "./Loading";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import noavatar from "../assets/noavatar.png";
const Comments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { id } = useParams();
  const [value, setValue] = useState(1);
  useEffect(() => {
    const fetchComents = async () => {
      try {
        const resReview = await axios.get(
          `http://localhost:8800/api/reviews/${id}`,
          {
            withCredentials: true,
          }
        );

        setLoading(false);
        setComments(resReview.data);
      } catch (error) {
        console.log(error);
        setError(error.response.data.message);
      }
    };
    fetchComents();
  }, []);
  const handlePushComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8800/api/reviews/`,
        {
          userId: currentUser.details._id,
          username: currentUser.details.username,
          userPfp: currentUser.details.img,
          publicationId: id,
          text: text,
          rating: value,
        },
        { withCredentials: true }
      );
      setComments([...comments, res.data]);
      setText("");
      setValue(0);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };
  console.log(comments);
  return (
    <div className="sm:px-4">
      {loading && <Loading />}
      {!loading && (
        <>
          {comments.length !== 0 && (
            <h1 className="text-xl sm:text-2xl text-gray-800 font-semibold sm:font-medium">
              AVIS SUR CE PRODUIT
            </h1>
          )}
          {currentUser && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "20px",
                marginTop: "20px",
                gap: "1rem",
                padding: "1rem",
                borderRadius: "2px",
              }}
              className="shadow-lg"
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                >
                  {currentUser.details.img ===
                    "http://localhost:8800/Images/undefined" && (
                    <img
                      src={noavatar}
                      alt=""
                      className="rounded-full h-12 w-12 object-cover"
                    />
                  )}
                  {currentUser.details.img !==
                    "http://localhost:8800/Images/undefined" && (
                    <img
                      src={currentUser.details.img}
                      alt=""
                      className="rounded-full h-12 w-12 object-cover"
                    />
                  )}
                  <Typography variant="h6" fontSize="16px" fontWeight={600}>
                    {currentUser.details.username}
                  </Typography>
                </Box>
              </Box>
              {error && <Typography color="red">{error}</Typography>}
              <form onSubmit={handlePushComment}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                  }}
                >
                  <Box>
                    <Typography variant="h6" fontSize="16px" fontWeight={600}>
                      Notez ce produit
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                      />
                    </Box>
                  </Box>
                  <Box>
                    <TextField
                      id="outlined-basic"
                      multiline
                      fullWidth
                      rows={4}
                      name="text"
                      onChange={(e) => {
                        setText(e.target.value);
                      }}
                      label="Votre commentaire"
                      variant="standard"
                    />
                  </Box>
                  <Box sx={{ alignSelf: "end", justifySelf: "end" }}>
                    <Button type="submit" variant="outlined">
                      Envoyer le commentaire
                    </Button>
                  </Box>
                </Box>
              </form>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              flexDirection: "column",
              marginBottom: "25px",
            }}
          >
            {comments.map((c) => (
              <>
                <div className="bg-white max-w-xl rounded-2xl px-5 py-8 shadow-lg hover:shadow-2xl transition duration-500">
                  <div className="flex justify-start items-center gap-2">
                    <img
                      src={c.userPfp}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <h1 className="text-gray-800 font-bold text-md">
                      {c.username}
                    </h1>
                  </div>
                  <div className="mt-4">
                    <h1 className="text-lg text-gray-700 font-semibold hover:underline cursor-pointer">
                      Évaluation du produit
                    </h1>
                    <div className="flex mt-2">
                      {Array(c.rating).fill(
                        <StarIcon sx={{ color: "gold" }} />
                      )}
                    </div>
                    <p className="mt-4 text-md text-gray-600">{c.text}</p>
                  </div>
                </div>
              </>
            ))}
          </Box>
        </>
      )}
    </div>
  );
};

export default Comments;

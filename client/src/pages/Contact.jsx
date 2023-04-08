import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";
import axios from "axios";
const Contact = () => {
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData(e.target);
      const email = data.get("email");
      const msg = data.get("message");
      await axios.post(
        "https://dzhikers.onrender.com/api/messages",
        { email, msg },
        {
          withCredentials: true,
        }
      );
      setOpen(true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section class="text-gray-600 body-font relative">
      <div class="absolute inset-0 bg-gray-100 sm:bg-gray-300">
        <div style={{ width: "100%" }}>
          <iframe
            width="100%"
            height="800px"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=TLEMCEN+(DZHIKERS)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            className="hidden sm:block"
          ></iframe>
        </div>
      </div>
      <form class="container px-5 py-24 mx-auto flex" onSubmit={handleSubmit}>
        <div class="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
          <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">
            Laissez nous un message!
          </h2>
          <p class="leading-relaxed mb-5 text-gray-600">
            Nous serons a votre disposition pour vous aider a trouver la
            solution qui vous convient.
          </p>
          <div class="relative mb-4">
            <label htmlFor="email" class="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              class="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div class="relative mb-4">
            <label htmlFor="message" class="leading-7 text-sm text-gray-600">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              class="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            ></textarea>
          </div>
          <button
            type="submit"
            class="text-white bg-blue-600 border-0 py-2 px-6 focus:outline-none hover:bg-blue-700 rounded text-lg"
          >
            Envoyer
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
            Message envoyé avec succès!
          </Alert>
        </Snackbar>
      )}
    </section>
  );
};

export default Contact;

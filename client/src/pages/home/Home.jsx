import React, { useEffect } from "react";
import Hero from "../../Components/Hero/Hero";
import ScrollToTop from "../../Components/ScrollToTop.jsx";
import Services from "../../Components/Services";
import scrollreveal from "scrollreveal";
import Section from "../../Components/Section";
import MainMap from "../../Components/Map/MainMap";
export default function App() {
  useEffect(() => {
    const sr = scrollreveal({
      origin: "top",
      distance: "50px",
      duration: 1000,
      reset: false,
    });
    sr.reveal(
      `
        nav,
        #hero,
        #services,
        #recommend,
        #text,
        #mapMain,
        `,
      {
        opacity: 0,
        interval: 300,
      }
    );
  }, []);
  return (
    <div>
      <ScrollToTop />
      <Hero />
      <Section />
      <h2
        className="mb-12 text-md text-gray-800 font-bold md:text-3xl md:px-11 text-sm px-4"
        id="text"
      >
        Vous trouvez nos randonées sur la carte ci-dessous
      </h2>
      <MainMap />
      <Services />
    </div>
  );
}

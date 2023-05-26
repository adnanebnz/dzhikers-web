import Hero from "../../Components/Hero/Hero";
import ScrollToTop from "../../Components/ScrollToTop.jsx";
import Services from "../../Components/Services";
import Section from "../../Components/Section";
import MainMap from "../../Components/Map/MainMap";
import CallToAction from "../../Components/CallToAction";
export default function App() {
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
      <CallToAction />
      <Services />
    </div>
  );
}

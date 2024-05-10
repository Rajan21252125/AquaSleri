import AboutUs from "../components/AboutUs";
import Carousel from "../components/Carousel";
import Contact from "../components/Contact";
import Feedback from "../components/Feedback";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import OurProduct from "../components/OurProduct";
import { FaWhatsapp } from "react-icons/fa";

const Home = () => {
  return (
    <div className="overflow-hidden relative">
      <div>
        <a
          href="https://wa.me/919999999999"
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-10 right-5 z-50 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600"
        >
          <FaWhatsapp size={30} />
        </a>
      </div>
      <Navbar />
      <Carousel />
      <AboutUs />
      <OurProduct />
      <Contact />
      <Feedback />
      <Footer />
    </div>
  );
};

export default Home;

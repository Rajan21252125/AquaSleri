import AboutUs from "../components/AboutUs";
import Carousel from "../components/Carousel";
import Contact from "../components/Contact";
import Feedback from "../components/Feedback";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import OurProduct from "../components/OurProduct";

const Home = () => {
  return (
    <div className="overflow-hidden">
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

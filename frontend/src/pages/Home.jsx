import { useState, useEffect } from "react";
import AboutUs from "../components/AboutUs";
import Carousel from "../components/Carousel";
import Contact from "../components/Contact";
import Feedback from "../components/Feedback";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import OurProduct from "../components/OurProduct";
import { FaWhatsapp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const products = useSelector((state) => state.product?.products);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResult([]);
      return;
    }
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResult(filteredProducts);
  }, [searchQuery, products]);



  const shortText = (text) => {
    // Split the text into words
    const words = text.split(" ");
    const truncatedWords = words.slice(0, 20);
    let truncatedText = truncatedWords.join(" ");
    if (words.length > 20) {
      truncatedText += "...";
    }
    return truncatedText;
  };


  return (
    <div className="overflow-hidden relative">
      <div>
        <a
          href="https://wa.me/919999999999"
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-20 lg:bottom-10 right-5 z-50 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600"
        >
          <FaWhatsapp size={30} />
        </a>
      </div>
      <Navbar setSearchQuery={setSearchQuery} />
          <Carousel />
          <AboutUs />
          <OurProduct />
          <Contact />
          <Feedback />
          <Footer />
      {searchQuery && (
            <div className="flex flex-col justify-center items-center absolute top-16 left-0 right-0 z-40">
              {searchResult.map((product) => (
                <Link to={"/product/"+product?._id} key={product?._id}>
                <div key={product?.id} className="bg-white hover:bg-gray-300 flex px-2 py-4 w-96 border-b cursor-pointer shadow-lg">
                  <img
                    src={product?.images[0]}
                    alt={product?.name}
                    className="w-8 h-8 object-cover"
                  />
                  <p className="text-base text-gray-600">{shortText(product?.name)}</p>
                </div>
                </Link>
              ))}
            </div>
      )}
    </div>
  );
};

export default Home;

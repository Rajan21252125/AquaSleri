/* eslint-disable react/prop-types */
import { Link  } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slice/cartSlice";
import { toast } from "react-toastify";

const Purifier = ({ filteredProducts, title }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const indexOfLastProduct = currentPage * 10;
  const indexOfFirstProduct = indexOfLastProduct - 10;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const shortText = (text, len) => {
    return text.length > len ? text.substring(0, len) + "..." : text;
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCart = async (product) => {
    dispatch(addToCart(product))
    toast.success("Product added to cart");
};


  return (
    <div>
      <Navbar />
      <div className="mx-10 lg:mx-40 xl:mx-60 my-10">
        <h1 className="text-3xl font-bold my-4 text-center">{title}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {currentProducts?.map((product) => (
            <div
              key={product?._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden mt-4"
            >
              <img
                src={product?.images[0]}
                alt="product"
                className="w-full h-56 object-cover object-center"
              />
              <div className="p-4">
                <Link to={"/product/" + product?._id}>
                  <h2 className="text-gray-800 text-2xl font-semibold">
                    {shortText(product?.name, 40)}
                  </h2>
                </Link>
                <p className="mt-2 text-gray-600">
                  {shortText(product?.description, 100)}
                </p>
                <div className="flex justify-between mt-3">
                  <div className="space-x-2">
                    <span className="text-lg font-bold text-gray-700">
                      ₹{product?.discountedPrice}
                    </span>
                    <span className="text-lg font-semibold text-gray-400 line-through">
                      ₹{product?.realPrice}
                    </span>
                  </div>
                  <button
                    className="px-3 py-1 bg-gray-800 text-white text-xs font-bold uppercase rounded"
                    onClick={() => handleCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <button
            className={`mx-2 px-3 py-1 text-white text-xs font-bold uppercase rounded ${
              currentPage === 1
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gray-800"
            }`}
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          {Array.from(
            { length: Math.ceil(filteredProducts.length / 10) },
            (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`mx-2 px-3 py-1 text-white text-xs font-bold uppercase rounded ${
                  currentPage === i + 1 ? "bg-gray-800" : "bg-gray-600"
                }`}
              >
                {i + 1}
              </button>
            )
          )}
          <button
            className={`mx-2 px-3 py-1 text-white text-xs font-bold uppercase rounded ${
              currentPage === Math.ceil(filteredProducts.length / 10)
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gray-800"
            }`}
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredProducts.length / 10)}
          >
            &gt;
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Purifier;

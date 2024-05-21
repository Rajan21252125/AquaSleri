/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CategoryPage = ({categories,title}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastCategory = currentPage * 10;
  const indexOfFirstCategory = indexOfLastCategory - 10;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const shortText = (text, len) => {
    return text.length > len ? text.substring(0, len) + "..." : text;
  };

  return (
    <div>
      <Navbar />
      <div className="mx-10 lg:mx-40 xl:mx-60 my-10">
        <h1 className="text-3xl font-bold my-4 text-center">{title}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {currentCategories?.map((category, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden mt-4"
            >
              <img
                src={category?.image}
                alt="category"
                className="w-full h-56 object-cover object-center"
              />
              <div className="p-4">
                {Array.isArray(category.link) ? (
                  category.link.map((link, i) => (
                    <Link key={i} to={link} target="_blank" rel="noopener noreferrer">
                      <h2 className="text-gray-800 text-2xl font-semibold">
                        {shortText(category?.name, 40)}
                      </h2>
                    </Link>
                  ))
                ) : (
                  <Link to={category?.link} target="_blank" rel="noopener noreferrer">
                    <h2 className="text-gray-800 text-2xl font-semibold">
                      {shortText(category?.name, 40)}
                    </h2>
                  </Link>
                )}
                <p className="mt-2 text-gray-600">
                  {shortText(category?.description, 100)}
                </p>
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
            { length: Math.ceil(categories.length / 10) },
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
              currentPage === Math.ceil(categories.length / 10)
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gray-800"
            }`}
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(categories.length / 10)}
          >
            &gt;
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;

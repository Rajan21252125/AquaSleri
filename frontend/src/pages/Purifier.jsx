import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* eslint-disable react/prop-types */
const Purifier = ({filteredProducts,title}) => {
  const shortText = (text,len) => {
    return text.length > len ? text.substring(0, len) + "..." : text;
  }
  return (
    <div>
      <Navbar />
      <div className="mx-60 my-10">
        <h1 className="text-3xl font-bold my-4 text-center">{title}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts?.map((product) => (
            <div key={product?._id} className="bg-white shadow-lg rounded-lg overflow-hidden mt-4">
              <img src={product?.images[0]} alt="product" className="w-full h-56 object-cover object-center" />
              <div className="p-4">
                <Link to={"/product/"+product?._id}><h2 className="text-gray-800 text-2xl font-semibold">{shortText(product?.name,40)}</h2></Link>
                <p className="mt-2 text-gray-600">{shortText(product?.description,100)}</p>
                <div className="flex justify-between mt-3">
                  <div className="space-x-2">
                  <span className="text-lg font-bold text-gray-700">₹{product?.discountedPrice}</span>
                  <span className="text-lg font-semibold text-gray-400 line-through">₹{product?.realPrice}</span>
                  </div>
                  <button className="px-3 py-1 bg-gray-800 text-white text-xs font-bold uppercase rounded">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      </div>
  )
}

export default Purifier

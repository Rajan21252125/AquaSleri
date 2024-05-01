import { useEffect, useState } from "react";
import { RiEdit2Line, RiDeleteBinLine } from "react-icons/ri";
import AdminNavbar from "./AdminNavbar";
import { deleteProduct, getProductList } from "../api";
import { toast } from "react-toastify";
import AdminFooter from "./AdminFooter";
import UpdateProduct from "./UpdateProduct";

const AdminHome = () => {
  const [products, setProducts] = useState([]);
  const [toggleShow, setToggleShow] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await getProductList();
        setProducts(productList?.data);
      } catch (error) {
        console.error("Error fetching product list:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    console.log(productId);
    try {
      const res = await deleteProduct(productId);
      console.log(res.data);
      if (!res.data.status) {
        toast.error(res.data.msg);
      }
      toast.success(res.data.msg);
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error deleting product");
    }
  };

  const handleUpdate = (data) => {
    setToggleShow(!toggleShow);
    setSelectedData(data);
    // console.log(selectedData)
  };

  const shortText = (text) => {
    return text.length > 15 ? text.substring(0, 15) + "..." : text;
  };

  return (
    <div>
      <AdminNavbar />
      <div className="mx-4 md:mx-12 lg:mx-24 xl:mx-36 my-8">
        <h1 className="text-3xl font-bold my-4 text-center">Product List</h1>

        <div className={`${toggleShow ? "block" : "hidden"} relative`}>
          <UpdateProduct data={selectedData} setToggleShow={setToggleShow}/>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-800">
            <thead>
              <tr>
                <th className="border border-gray-800 px-4 py-2">Serial No</th>
                <th className="border border-gray-800 px-4 py-2">Images</th>
                <th className="border border-gray-800 px-4 py-2">Name</th>
                <th className="border border-gray-800 px-4 py-2">Category</th>
                <th className="border border-gray-800 px-4 py-2">
                  Description
                </th>
                <th className="border border-gray-800 px-4 py-2">
                  Discounted Price
                </th>
                <th className="border border-gray-800 px-4 py-2">Real Price</th>
                <th className="border border-gray-800 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product, index) => (
                  <tr key={product?._id} className="border-b-2">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2 flex w-40 overflow-x-scroll no-scrollbar">
                      {product?.images?.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`Image ${idx + 1}`}
                          className="w-28 h-16 object-cover mr-2 mb-2"
                        />
                      ))}
                    </td>
                    <td className="px-4 py-2">{shortText(product.name)}</td>
                    <td className="px-4 py-2">
                      {shortText(product.category.join(", "))}
                    </td>
                    <td className="px-4 py-2">
                      {shortText(product.description)}
                    </td>

                    <td className="px-4 py-2">{product.discountedPrice}</td>
                    <td className="px-4 py-2">{product.realPrice}</td>
                    <td className="px-4 py-2 flex space-x-2">
                      <button
                        className="flex items-center justify-center px-3 py-1 bg-blue-500 text-white rounded-md"
                        onClick={() => handleUpdate(product)}
                      >
                        <RiEdit2Line className="mr-1" />
                        Update
                      </button>
                      <button
                        className="flex items-center justify-center px-3 py-1 bg-red-500 text-white rounded-md"
                        onClick={() => handleDelete(product._id)}
                      >
                        <RiDeleteBinLine className="mr-1" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <AdminFooter />
    </div>
  );
};

export default AdminHome;

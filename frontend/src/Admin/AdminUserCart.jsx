import { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar'; // Assuming you have an AdminNavbar component
import { getUserCart } from '../api'; // Assuming this is the function to fetch cart data from the backend

const AdminUserCart = () => {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await getUserCart();
        setCartData(response.data.data);
      } catch (error) {
        setError('Failed to fetch cart data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-red-500">{error}</div>
      </div>
    );
  }

  console.log(cartData)

  return (
    <>
      <AdminNavbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">All Cart Data</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">User ID</th>
                <th className="py-2 px-4 border-b">Product Name</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Total</th>
                <th className="py-2 px-4 border-b">Images</th>
              </tr>
            </thead>
            <tbody>
              {cartData.map((cartItem) => (
                <tr key={cartItem._id}>
                  <td className="py-2 px-4 border-b">{cartItem.userId}</td>
                  <td className="py-2 px-4 border-b">
                    {cartItem.cartItems.map((product, index) => (
                      <div key={index} className="flex flex-col">
                        <span>{product.productName}</span>
                      </div>
                    ))}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {cartItem.cartItems.map((product, index) => (
                      <div key={index} className="flex flex-col">
                        <span>{product.quantity}</span>
                      </div>
                    ))}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {cartItem.cartItems.map((product, index) => (
                      <div key={index} className="flex flex-col">
                        <span>{product.price}</span>
                      </div>
                    ))}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {cartItem.cartItems.map((product, index) => (
                      <div key={index} className="flex flex-col">
                        <span>{product.total}</span>
                      </div>
                    ))}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {cartItem.cartItems.map((product, index) => (
                      <div key={index} className="flex flex-col">
                        <img src={product.images[0]} className='w-10'/>
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminUserCart;

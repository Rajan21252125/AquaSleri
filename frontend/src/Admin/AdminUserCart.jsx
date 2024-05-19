import { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar'; // Assuming you have an AdminNavbar component
import { getUserCart, getUserById } from '../api'; // Import the getUserById function

const AdminUserCart = () => {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await getUserCart();
        const carts = response.data.data.filter((data) => data?.cartItems?.length !== 0);

        // Fetch user info for each cart
        const cartsWithUserInfo = await Promise.all(
          carts.map(async (cart) => {
            const userInfo = await getUserById(cart.userId);
            return { ...cart, user: userInfo.data };
          })
        );

        setCartData(cartsWithUserInfo);
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
        <h1 className="text-2xl font-bold my-6 text-center">All Cart Data</h1>
        <div className="overflow-x-auto mx-40">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border-2 border-black">User Name</th>
                <th className="py-2 px-4 border-2 border-black">User Email</th>
                <th className="py-2 px-4 border-2 border-black">User Phone</th>
                <th className="py-2 px-4 border-2 border-black">Product Name</th>
                <th className="py-2 px-4 border-2 border-black">Quantity</th>
                <th className="py-2 px-4 border-2 border-black">Price</th>
                <th className="py-2 px-4 border-2 border-black">Total</th>
                <th className="py-2 px-4 border-2 border-black">Images</th>
              </tr>
            </thead>
            <tbody>
              {cartData.map((cartItem) => (
                <tr key={cartItem._id}>
                  <td className="py-2 px-4 border border-black">{cartItem?.user?.fullName}</td>
                  <td className="py-2 px-4 border border-black">{cartItem?.user?.email}</td>
                  <td className="py-2 px-4 border border-black">{cartItem?.user?.phoneNumber}</td>
                  <td className="py-2 px-4 border border-black">
                    {cartItem.cartItems.map((product, index) => (
                      <div key={index} className="flex flex-col">
                        <span>{product.productName}</span>
                      </div>
                    ))}
                  </td>
                  <td className="py-2 px-4 border border-black">
                    {cartItem.cartItems.map((product, index) => (
                      <div key={index} className="flex flex-col">
                        <span>{product.quantity}</span>
                      </div>
                    ))}
                  </td>
                  <td className="py-2 px-4 border border-black">
                    {cartItem.cartItems.map((product, index) => (
                      <div key={index} className="flex flex-col">
                        <span>{product.price}</span>
                      </div>
                    ))}
                  </td>
                  <td className="py-2 px-4 border border-black">
                    {cartItem.cartItems.map((product, index) => (
                      <div key={index} className="flex flex-col">
                        <span>{product.total}</span>
                      </div>
                    ))}
                  </td>
                  <td className="py-2 px-4 border border-black">
                    {cartItem.cartItems.map((product, index) => (
                      <div key={index} className="flex flex-col">
                        <img src={product.images[0]} alt="Product" className="w-10" />
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

import { useEffect, useState } from "react";
import { getOrderByProductId, getUserById } from "../api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";

const DetailedOrderPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const fetchOrderAndUser = async () => {
    try {
      const orderData = await getOrderByProductId(id);
      setOrder(orderData?.data);

      if (orderData?.data?.user) {
        const userData = await getUserById(orderData.data.user);
        setError("");
        setUser(userData?.data);
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    fetchOrderAndUser();
  }, [id]);

  const getStatusProgress = (status) => {
    switch (status) {
      case "Confirmed":
        return "25%";
      case "Shipped":
        return "50%";
      case "Out for delivery":
        return "75%";
      case "Delivered":
        return "100%";
      default:
        return "0%";
    }
  };

  const getStatusTextClass = (status) => {
    switch (status) {
      case "Delivered":
        return "text-green-600";
      case "Shipped":
        return "text-orange-600";
      case "Cancelled":
        return "text-red-600";
      default:
        return "text-black";
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8 px-4">
        <h1 className="text-center text-2xl font-bold">Order Details</h1>
        {error && <div className="text-center text-red-600 mt-4">{error}</div>}
        {order && user ? (
          <div className="my-10 lg:mx-20 border-2 p-4 md:p-6">
            {/* Delivery Address and User Information */}
            <div className="mb-8 flex justify-between">
              <div>
                <h2 className="text-lg font-semibold mb-2">Delivery Address</h2>
                <p>{user.fullName}</p>
                <p>{order.shippingAddress.address1}</p>
                <p>{order.shippingAddress.address2}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state},{" "}
                  {order.shippingAddress.zipCode}
                </p>
                <p>{order.shippingAddress.country}</p>
                <p>Phone number: {user.phoneNumber}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold mt-4 mb-2">Order Id</h2>
                <p>{order._id}</p>
              </div>
            </div>

            {/* Order Tracking */}
            <div className="border-t border-b py-4 mb-8">
              <div className="flex flex-col md:flex-row items-center">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-lg font-semibold">
                    Order {order.orderStatus}
                  </h2>
                  <p>Item waiting to be picked up by courier partner.</p>
                  <p>Sat, 18th May, 11:21 pm</p>
                </div>
                <div className="flex flex-col md:flex-row md:space-x-4">
                  <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded mb-2 md:mb-0">
                    Cancel Basket
                  </button>
                  <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded">
                    Need help?
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-gray-200 border border-gray-400 flex-shrink-0"></div>
                    <div className="ml-2">Order Confirmed</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-gray-200 border border-gray-400 flex-shrink-0"></div>
                    <div className="ml-2">Shipped</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-gray-200 border border-gray-400 flex-shrink-0"></div>
                    <div className="ml-2">Out for delivery</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-gray-200 border border-gray-400 flex-shrink-0"></div>
                    <div className="ml-2">Delivery</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 h-1 my-2 relative">
                  <div
                    className="bg-green-500 h-1 absolute"
                    style={{ width: getStatusProgress(order.orderStatus) }}
                  ></div>
                </div>
                <div className="flex flex-col md:flex-row justify-between text-sm">
                  <div className={getStatusTextClass(order.orderStatus)}>
                    {order.orderStatus === "Confirmed" ? "Sat, 18th May" : ""}
                  </div>
                  <div className={getStatusTextClass(order.orderStatus)}>
                    {order.orderStatus === "Shipped" ? "Tue, 21st May" : ""}
                  </div>
                  <div className={getStatusTextClass(order.orderStatus)}>
                    {order.orderStatus === "Out for delivery"
                      ? "Expected by Tue, 21st"
                      : ""}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="border-t pt-4">
              <h2 className="text-lg font-semibold mb-4">
                Items yet to be shipped ({order.orderItems.length} items)
              </h2>
              {order.orderItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col md:flex-row justify-between items-center mb-4"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="w-20 h-20 md:w-32 md:h-32 object-cover"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p>Quantity: x{item.quantity}</p>
                      <p className="font-semibold">Price: ₹{item.price}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex flex-col md:flex-row justify-between items-center mt-4">
                <div>
                  <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded">
                    Cancel
                  </button>
                  <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded ml-4">
                    Need help?
                  </button>
                </div>
                <div className="text-right mt-4 md:mt-0">
                  <h3 className="text-lg font-semibold">
                    Total Price: ₹{order.totalPrice}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        ) : (
          !error && <div className="text-center mt-4">Loading...</div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DetailedOrderPage;

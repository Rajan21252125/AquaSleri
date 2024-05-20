import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { getOrdersById } from "../api";
import { Link } from "react-router-dom";

const OrderPage = () => {
  const [usersOrder, setUserOrder] = useState([]);

  const fetchOrder = async () => {
    try {
      const data = await getOrdersById();
      // Sort the orders by createdAt in descending order (most recent first)
      const sortedOrders = data?.data?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setUserOrder(sortedOrders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="mx-4 mt-6 md:mx-20 lg:mx-40">
        <h1 className="text-center text-2xl font-bold">Order Page</h1>
        <div>
          {usersOrder?.length > 0 ? (
            usersOrder?.map((order) => (
              <Link key={order?._id} to={'/user/order/'+order?._id}>
                <div className="my-10 border-2 p-4 md:p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center md:mx-6">
                    <div className="w-full md:w-2/3">
                      {order?.orderItems?.map((item) => (
                        <div key={item?._id} className="flex justify-between items-center md:justify-normal flex-row space-y-4 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
                          <div className="flex-shrink-0">
                            <img
                              src={item?.image?.[0]}
                              alt={item?.name}
                              className="w-20 h-20 md:w-32 md:h-32 object-cover"
                            />
                          </div>
                          <div>
                            <h1 className="font-semibold text-base md:text-lg">{item?.name}</h1>
                            <h1>Quantity: x{item?.quantity}</h1>
                          </div>
                        </div>
                      ))}
                      <div className="mt-4">
                        <h1 className="text-base md:text-lg font-sans">Total Price: ₹{order?.totalPrice}</h1>
                      </div>
                    </div>
                    <div className="w-full md:w-1/3 hidden md:flex md:flex-row md:justify-between md:items-center mt-4 md:mt-0 space-y-4 md:space-y-0">
                      <div className="text-center md:text-left">
                        <p className="font-semibold">Status</p>
                        <p className={`${order?.orderStatus === "Delivered" ? "text-green-600" : order?.orderStatus === "Shipped" ? "text-orange-600" : order?.orderStatus === "Cancelled" ? "text-red-600" : "text-black"} font-semibold text-base`}>{order?.orderStatus}</p>
                      </div>
                      <div className="text-center md:text-left">
                        <p className="font-semibold">Delivery Expected</p>
                        <p>
                          {new Date(order?.updatedAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center mt-10 text-lg">You have not ordered anything till now.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderPage;

import { useEffect, useState } from "react";
import AdminFooter from "./AdminFooter";
import AdminNavbar from "./AdminNavbar";
import { getAllOrders, getUserById, updateOrder } from "../api";
import { toast } from "react-toastify";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();
      const ordersWithUserDetails = await Promise.all(
        data.data.map(async (order) => {
          const userDetails = await getUserById(order.user);
          return { ...order, userDetails: userDetails.data };
        })
      );
      // Sort orders by createdAt date
      const sortedOrders = ordersWithUserDetails.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(sortedOrders);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrder = async (e, id, orderStatus) => {
    e.preventDefault();
    try {
      await updateOrder(id,orderStatus);
      toast.success("Successfully Updated")
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = (index, status) => {
    const updatedOrders = [...orders];
    updatedOrders[index].orderStatus = status;
    setOrders(updatedOrders);
  };

  return (
    <div>
      <AdminNavbar />
      <div className="container mx-auto my-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">All Orders</h2>
        <div className="overflow-x-auto mx-20">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="px-4 py-2 border">User Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Phone Number</th>
                <th className="px-4 py-2 border">Shipping Address</th>
                <th className="px-4 py-2 border">Order Items</th>
                <th className="px-4 py-2 border">Payment Method</th>
                <th className="px-4 py-2 border">Order Status</th>
                <th className="px-4 py-2 border">Created At</th>
                <th className="px-4 py-2 border">Update Order</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <td className="px-4 py-2 border">{order?.userDetails?.fullName}</td>
                  <td className="px-4 py-2 border">{order?.userDetails?.email}</td>
                  <td className="px-4 py-2 border">{order?.userDetails?.phoneNumber}</td>
                  <td className="px-4 py-2 border">
                    <div>{order.shippingAddress.address1}</div>
                    <div>{order.shippingAddress.address2}</div>
                    <div>
                      {order.shippingAddress.city}, {order.shippingAddress.zipCode}
                    </div>
                    <div>{order.shippingAddress.country}</div>
                  </td>
                  <td className="px-4 py-2 border">
                    {order.orderItems.map((item, index) => (
                      <div key={index}>
                        <div>{item.name} (x{item.quantity})</div>
                      </div>
                    ))}
                  </td>
                  <td className="px-4 py-2 border">{order.paymentInfo.method}</td>
                  <td className="px-4 py-2 border">
                    <select
                      value={order.orderStatus}
                      onChange={(e) => handleStatusChange(index, e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      {["Processing", "Shipped", "Delivered", "Cancelled"].map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-2 border">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border">
                    <button className="bg-blue-500 text-white px-4 py-1 rounded" onClick={(e) => handleOrder(e, order._id, order.orderStatus)}>
                      Update
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

export default AllOrders;

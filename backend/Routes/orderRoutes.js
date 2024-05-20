import express from 'express';
import auth from '../Middleware/auth.js';
import adminAuth from '../Middleware/auth.js';
import { createOrder, getOrderByProductId, getOrders, getOrdersByUserId, updateOrderStatus } from '../Controllers/orderController.js';



const route = express.Router();



route.post("/create-order",auth,createOrder)





// get all orders
route.get("/admin/get-orders",adminAuth,getOrders)




// get order detail using id
route.get("/get-order",auth,getOrdersByUserId)





// Update order status 
route.put("/admin/updateOrder/:id",adminAuth,updateOrderStatus)






// get order by order id 
route.get("/order-page/order/:id",auth,getOrderByProductId)






export default route
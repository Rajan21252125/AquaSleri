import express from 'express';
import auth from '../Middleware/auth.js';
import adminAuth from '../Middleware/auth.js';
import { createOrder, getOrders } from '../Controllers/orderController.js';



const route = express.Router();



route.post("/create-order",auth,createOrder)





// get all orders
route.get("/admin/get-orders",adminAuth,getOrders)





export default route
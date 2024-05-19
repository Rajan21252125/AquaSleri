import express from 'express';
import { orderPayment, verifyPayment } from '../Controllers/PaymentController.js';
import auth from '../Middleware/auth.js';



const route = express.Router();



route.post("/payment",auth,orderPayment)





route.post("/verify",auth,verifyPayment)






export default route
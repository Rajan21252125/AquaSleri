import express from "express";
import { addToCart, deleteCartItem, viewCart } from "../Controllers/cartController.js";
import auth from "../Middleware/auth.js";




const route = express.Router();



// to add a product to cart
route.post("/add", addToCart);




// to view cart
route.get("/view/",auth, viewCart);





// to delete a product from cart
route.delete("/delete",auth, deleteCartItem);




export default route

import express from "express";
import { addToCart, deleteCartItem, viewCart } from "../Controllers/cartController.js";




const route = express.Router();



// to add a product to cart
route.post("/add", addToCart);




// to view cart
route.get("/view/:id", viewCart);





// to delete a product from cart
route.delete("/delete", deleteCartItem);




export default route

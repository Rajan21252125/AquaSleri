import express from "express";
import { addToCart, clearCart, deleteCartItem, deleteProductFromCart, viewAllCartData, viewCart } from "../Controllers/cartController.js";
import auth from "../Middleware/auth.js";
import adminAuth from "../Middleware/adminAuth.js";




const route = express.Router();



// to add a product to cart
route.post("/add",auth, addToCart);




// to view cart
route.get("/view/",auth, viewCart);





// to delete a product from cart
route.delete("/delete/:id",auth, deleteCartItem);




// DELETE ONE PRODUCT FROM CART
route.delete("/deleteOne/:id",auth,deleteProductFromCart)





// clear cart
route.delete("/clearCart",auth,clearCart)





// get data
route.get("/admin/view",adminAuth , viewAllCartData)






export default route

import express from "express";
import { addProduct, addProductImage, deleteProduct, updateProduct, viewProduct } from "../Controllers/product.js";




const route = express.Router();


route.post("/add", addProduct);
route.post("/addImage/:id", addProductImage);
route.get("/view", viewProduct);
route.put("/update/:id", updateProduct);
route.delete("/delete/:id", deleteProduct);



export default route
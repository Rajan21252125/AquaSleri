import express from "express";
import { addProduct, addProductImage, deleteProduct, updateProduct, viewProduct } from "../Controllers/product.js";
import { multiImageUpload } from "../Controllers/multiImageUpload.js";
import upload from "../Middleware/multer.js";




const route = express.Router();




// to add a product
route.post("/add", addProduct);



// to add a product image
route.post("/addImage/:id", addProductImage);



// to view all products
route.get("/view", viewProduct);



// to update a product
route.put("/update/:id", updateProduct);




// to delete a product
route.delete("/delete/:id", deleteProduct);





// to upload multiple images
route.post("/multiImage", upload.array('images'), multiImageUpload);




export default route
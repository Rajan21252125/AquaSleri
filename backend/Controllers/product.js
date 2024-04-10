import Product from "../Schema/product.js";
import cloudinary from '../utils/cloudinary.js';


// Route to add a new product
export const addProduct = async (req, res) => {
    try {
        const { name, description, category , images, realPrice, discountedPrice } = req.body;
        if (!name || !description || !category || !images || !realPrice || !discountedPrice) {
            return res.status(400).json({ status:false, msg: 'All fields are required' });
        }
        const existingProduct = await Product.findOne({ name: name });
        if (existingProduct) {
            return res.status(409).json({ status:false, msg: 'Product name is already taken' });
        }
        await Product.create({ name, description, category, images, realPrice, discountedPrice });
        return res.status(201).json({ status:true, msg: 'Product added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status:false, msg: 'Internal Server Error' });
    }
};

// Route to get all products
export const viewProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
} ;

// Route to update a product by ID
export const updateProduct = async (req, res) => {
    try {
        const { name, description, images, realPrice, discountedPrice } = req.body;
        const product = await Product.findByIdAndUpdate(req.params.id, { name, description, images, realPrice, discountedPrice }, { new: true });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const addProductImage = async (req,res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        product.images.push(req.body.images);
        await product.save();
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

// Route to delete a product by ID
export const deleteProduct = async (req, res) => {
    try {
        // Find the product by its ID in the MongoDB database
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ status: false, msg: 'Product not found' });
        }
        
        // Extract image URLs from the product
        const imageUrls = product.images;
        
        // Delete each image from Cloudinary
        await Promise.all(imageUrls.map(async (imageUrl) => {
            // Extract the public ID of the image from the URL
            const publicId = imageUrl.split('/').pop().split('.')[0];
            
            // Delete the image from Cloudinary
            await cloudinary.uploader.destroy(publicId);
        }));

        // Respond with success message
        res.json({ status: true, msg: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, msg: 'Internal Server Error' });
    }
};





// get product By id 
export const getProductById = async (req,res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({ status: false, msg: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, msg: 'Internal Server Error' });
    }
}
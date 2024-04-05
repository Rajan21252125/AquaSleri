import Product from "../Schema/product.js";

// Route to add a new product
export const addProduct = async (req, res) => {
    try {
        const { name, description, images, realPrice, discountedPrice } = req.body;
        const product = new Product({ name, description, images, realPrice, discountedPrice });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
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
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

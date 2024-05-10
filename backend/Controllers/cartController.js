import Cart from '../Schema/cart.js';


export const addToCart = async (req, res) => {
    try {
        const user = req.user.user.id;
        const product = req.body.cartItems;
        console.log()
        if (!user || !product) {
            return res.status(400).json({ status: false, msg: 'Invalid request. Missing required fields.' });
        }

        // Retrieve the user's cart
        let cart = await Cart.findOne({ user });

        // If the user doesn't have a cart yet, create a new one
        if (!cart) {
            cart = await Cart.create({ user, cartItems: [] });
        }

        // Check if the product already exists in the cart
        const existingItemIndex = cart.cartItems.findIndex((cartItem) => cartItem._id === product._id);

        if (existingItemIndex === -1) {
            cart.cartItems.push(product);
        }
        await cart.save();

        return res.status(201).json({ status: true, msg: 'Product added to cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, msg: 'Internal Server Error' });
    }
};



export const viewCart = async (req, res) => {
    try {
        const user = req.user.user.id;
        if (!user) {
            return res.status(400).json({ status: false, msg: 'User ID is required' });
        }
        const data = await Cart.findOne({ user });
        if (!data) {
            return res.status(404).json({ status: false, msg: 'Cart is empty' });
        }
        return res.status(200).json({ status: true, data: data.cartItems });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, msg: 'Internal Server Error' });
    }
};



export const deleteCartItem = async (req, res) => {
    try {
        const user = req.user.user.id;
        const { product } = req.body;
        if (!user || !product) {
            return res.status(400).json({ status: false, msg: 'All fields are required' });
        }
        const cart = await Cart.findOne({ user });
        if (!cart) {
            return res.status(404).json({ status: false, msg: 'Cart is empty' });
        }
        const items = cart.cartItems;
        const itemIndex = items.findIndex(p => p.product === product);
        if (itemIndex > -1) {
            items.splice(itemIndex, 1);
            await Cart.updateOne({ user }, { cartItems: items });
            return res.status(200).json({ status: true, msg: 'Item removed from cart successfully' });
        } else {
            return res.status(404).json({ status: false, msg: 'Item not found in cart' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, msg: 'Internal Server Error' });
    }

}
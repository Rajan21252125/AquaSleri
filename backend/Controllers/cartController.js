import Cart from '../Schema/cart.js';


export const addToCart = async (req, res) => {
    try {
        const { user, cartItems } = req.body;
        if (!user || !cartItems) {
            return res.status(400).json({ status: false, msg: 'All fields are required' });
        }
        const cart = await Cart.findOne({ user });
        if (cart) {
            let items = cart.cartItems;
            // Check if the cart already contains the same product
            const existingItemIndex = items.findIndex(item => item.product === cartItems.product);
            console.log(existingItemIndex)
            if (existingItemIndex !== -1) {
                // If the product already exists in the cart, update the quantity
                items[existingItemIndex].quantity += cartItems.quantity;
            } else {
                // If the product is not in the cart, add it to the cartItems array
                items.push(cartItems);
            }
            // Update the cart with the modified cartItems array
            await Cart.updateOne({ user }, { cartItems: items });
            return res.status(201).json({ status: true, msg: 'Product(s) added to cart successfully' });
        } else {
            await Cart.create({ user, cartItems });
            return res.status(201).json({ status: true, msg: 'Product(s) added to cart successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, msg: 'Internal Server Error' });
    }
};







export const viewCart = async (req, res) => {
    try {
        const user = req.params.id;
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
        const { user, product } = req.body;
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
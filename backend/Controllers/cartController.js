import User from '../Schema/UserSchema.js';
import Cart from '../Schema/cart.js';


export const addToCart = async (req, res) => {
    try {
        const user = req.user.user.id;
        const product = req.body.cartItems;
        if (!user || !product) {
            return res.status(400).json({ status: false, msg: 'Invalid request. Missing required fields.' });
        }
        // Retrieve the user's cart
        let cart = await Cart.findOne({ userId : user });
        // Save changes in the database
        if (!cart) {
            cart = await Cart.create({ user: user, cartItems: [] });
        }

        if (cart) {
            //---- Check if index exists ----
            const indexFound = cart.cartItems.findIndex(item => item.productId == product[0].productId);

            //------This removes an item from the cart if the quantity is set to zero -------
            if (indexFound !== -1) {
                cart.cartItems[indexFound].quantity += 1;
                cart.cartItems[indexFound].total = cart.cartItems[indexFound].quantity * product[0].price;
                cart.subTotal = cart.cartItems.map(item => item.total).reduce((acc, next) => acc + next);
            }
            else {
                // Add the new item to the cart
                cart.cartItems.push({
                    productId: product[0].productId,
                    quantity: 1,
                    images: product[0].images,
                    productName: product[0].productName,
                    price: product[0].price,
                    total: product[0].price * 1  // Corrected calculation
                });
                
                cart.userId = user
                // Update the subtotal
                cart.subTotal = cart.cartItems.map(item => item.total).reduce((acc, next) => acc + next);
            }
        }

        // Save the updated cart
        let data = await cart.save();


        return res.status(201).json({ status: true, msg: 'Product added to cart successfully', data: data });
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
        const data = await Cart.findOne({ userId:user });
        if (!data) {
            return res.status(404).json({ status: false, msg: 'Cart is empty' });
        }
        return res.status(200).json({ status: true, data: data.cartItems , totalPrice : data.subTotal });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, msg: 'Internal Server Error' });
    }
};



export const deleteCartItem = async (req, res) => {
    try {
        const user = req.user.user.id;
        const productId = req.params.id; // Assuming productId is passed in the request body
        if (!user || !productId) {
            return res.status(400).json({ status: false, msg: 'All fields are required' });
        }
        const cart = await Cart.findOne({ userId: user });
        if (!cart) {
            return res.status(404).json({ status: false, msg: 'Cart is empty' });
        }
        const items = cart.cartItems;
        const itemIndex = items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex > -1) {
            if (items[itemIndex].quantity === 1) {
                // If quantity is 1, remove the product from the cart
                items.splice(itemIndex, 1);
            } else {
                // If quantity is greater than 1, decrement the quantity by one
                items[itemIndex].quantity -= 1;
                items[itemIndex].total = items[itemIndex].quantity * items[itemIndex].price
            }
            cart.subTotal = cart.cartItems.map(item => item.total).reduce((acc, next) => acc + next);
            await cart.save(); // Save the updated cart
            return res.status(200).json({ status: true, msg: 'Item updated in cart successfully' });
        } else {
            return res.status(404).json({ status: false, msg: 'Item not found in cart' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, msg: 'Internal Server Error' });
    }
}


// clear cart
export const clearCart = async (req, res) => {
    try {
        const user = req.user.user.id;
        if (!user) return res.status(401).json({ status: false, msg: "User Not found!" });
        const userCart = await Cart.findOneAndDelete({ userId: user }); // Use findOneAndDelete to delete a single document
        if (!userCart) return res.status(400).json({ status: false, msg: "Cart is Empty" });
        return res.status(200).json({ success: true, msg: "All items deleted from the cart" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, msg: "Internal Server Error" });
    }
};



// Define route to delete a particular product from the cart
export const deleteProductFromCart = async (req, res) => {
    try {
        const user = req.user.user.id;
        const productId = req.params.id; // Assuming productId is passed as a route parameter
        if (!user || !productId) {
            return res.status(400).json({ status: false, msg: 'User ID and Product ID are required' });
        }
        const cart = await Cart.findOne({ userId: user });
        if (!cart) {
            return res.status(404).json({ status: false, msg: 'Cart is empty' });
        }
        const items = cart.cartItems;
        const itemIndex = items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex > -1) {
            // Remove the product from the cart
            items.splice(itemIndex, 1);
            // Check if the cartItems array is not empty before calling reduce
            if (items.length > 0) {
                cart.subTotal = cart.cartItems.map(item => item.total).reduce((acc, next) => acc + next);
            } else {
                cart.subTotal = 0; // Set subTotal to 0 if cartItems array is empty
            }
            await cart.save(); // Save the updated cart
            return res.status(200).json({ status: true, msg: 'Product deleted from cart successfully' });
        } else {
            return res.status(404).json({ status: false, msg: 'Product not found in cart' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, msg: 'Internal Server Error' });
    }
};





// Controller function to view all cart data
export const viewAllCartData = async (req, res) => {
    try {
        const userId = req.user.user.id;
        if (!userId) {
            return res.status(400).json({ success: false, msg: 'User ID is required' });
        }
        // Retrieve all cart data from the database
        const allCartData = await Cart.find();
        
        // Return the cart data in the response
        res.status(200).json({ success: true, data: allCartData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal Server Error' });
    }
};


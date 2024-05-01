import mongoose from "mongoose";



const CartSlice = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    cartItems: [
        {
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
            },
            realPrice: {
                type: Number,
                required: true
            },
            discountedPrice: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            }
        }
    ]
}, {
    timestamps: true
});



const Cart = mongoose.model('Cart', CartSlice);
export default Cart;
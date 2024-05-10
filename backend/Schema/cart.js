import mongoose from "mongoose";



const CartSlice = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    cartItems: [],
    timestamps: {
        type: Date,
        default: Date.now,
    }
});



const Cart = mongoose.model('Cart', CartSlice);
export default Cart;
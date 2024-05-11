import mongoose from "mongoose";
import { Schema } from "mongoose";



let ItemSchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less then 1.']
    },
    images: {
        type: [String],
        require: true
    },
    productName : {
        type : String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    total : {
        type : Number,
        required: false
    }
})
const CartSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    cartItems: [ItemSchema],
    subTotal: {
        default: 0,
        type: Number
    }
}, {
    timestamps: true
})



const Cart = mongoose.model('cart', CartSchema);
export default Cart

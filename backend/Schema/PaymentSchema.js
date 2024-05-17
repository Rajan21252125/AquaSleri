import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const PaymentSchema = new Schema({
    user : {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    razorpay_order_id: {
        type: String,
        required: true,
    },
    razorpay_payment_id: {
        type: String,
        required: true,
    },
    razorpay_signature: {
        type: String,
        required: true,
    },
    orderData : {
        type: Object,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});
export default model('payment', PaymentSchema);
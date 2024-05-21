import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  shippingAddress: {
    type: Object,
    required : true
  },
  orderItems: [{
    type : Object,
    required : true
  }],
  paymentInfo: {
    method: { type: String, required: true },
    id : {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Payment',
    }
  },
  order_id : {type : String},
  shipment_id : {type : String},
  subTotalPrice: { type: Number, required: true },
  shippingPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
  isDelivered: { type: Boolean, default: false },
  deliveredAt: { type: Date },
  orderStatus: {
    type: String,
    default: 'Processing',
    enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled']
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;

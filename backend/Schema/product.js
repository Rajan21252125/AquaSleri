import mongoose from "mongoose";

// Define the product schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: [
        {
            type: String,
            required: true,
        }
    ],
    images: [
        {
          type: String,
          required: true,
        },
      ],
    realPrice: {
        type: Number,
        required: true
    },
    discountedPrice: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the product model
const Product = mongoose.model('Product', productSchema);

export default Product;

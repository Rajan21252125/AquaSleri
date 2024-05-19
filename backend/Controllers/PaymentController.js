import Razorpay from 'razorpay';
import crypto from 'crypto';
import Payment from '../Schema/PaymentSchema.js';

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

export const orderPayment = (req, res) => {
    const { amount } = req.body;

    try {
        const options = {
            amount: Number(amount * 100),
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        };

        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log("Razorpay Order Creation Error:", error);
                return res.status(500).json({ status: false, msg: "Something Went Wrong!" });
            }
            console.log("Razorpay Order Created:", order);
            res.status(200).json({ data: order });
        });
    } catch (error) {
        console.log("Order Payment Internal Server Error:", error);
        res.status(500).json({ status: false, msg: "Internal Server Error!" });
    }
};

export const verifyPayment = async (req, res) => {
    const user = req.user.user.id;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    try {
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(sign.toString())
            .digest("hex");

        const isAuthentic = expectedSign === razorpay_signature;

        if (isAuthentic) {
            const payment = new Payment({
                user,
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
            });

            await payment.save();
            console.log("Payment Verified and Saved:", payment);

            res.json({
                status: true,
                msg: "Payment Successfully",
                id: payment._id
            });
        } else {
            console.log("Payment Verification Failed: Invalid Signature");
            res.status(400).json({ status: false, msg: "Payment Verification Failed!" });
        }
    } catch (error) {
        console.log("Verify Payment Internal Server Error:", error);
        res.status(500).json({ status: false, msg: "Internal Server Error!" });
    }
};

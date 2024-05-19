/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { clearCart, createOrder, orderapi, verifyPayment, viewCart } from "../api";
import { toast } from "react-toastify";
import axios from "axios";
import CartData from './CartData';
import useGetCart from "../customHook/useGetCart";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const [cart, setCart] = useState(null);
  const { state } = location;
  const { shippingAddress } = state || {};
  const { totalPrice } = useGetCart();

  const fetchCart = async () => {
    try {
      const data = await viewCart();
      setCart(data?.data?.data);
    } catch (error) {
      console.log("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    if (!state) {
      // Redirect to checkout if no state is passed
      navigate("/checkout");
    }
    fetchCart();
  }, [state]);

  if (!state) return null;

  const shipping = 100;
  const subTotalPrice = totalPrice + shipping;

  const handlePayment = async (amount, orderData) => {
    try {
      const res = await orderapi(amount);
      console.log("Order API Response:", res);
      handlePaymentVerify(res?.data?.data, orderData);
    } catch (error) {
      console.log("Error handling payment:", error);
      toast.error("Payment initiation failed. Please try again.");
    }
  };

  const handlePaymentVerify = async (data, orderData) => {
    console.log("Payment Data:", data);
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "AquaSleri",
      description: "Test Mode",
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyResponse = await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderData
          });
          console.log("Verify Payment Response:", verifyResponse);

          const verifyData = verifyResponse.data;
          if (verifyData.status) {
            orderData.paymentInfo.id = verifyData.id;
            const order = await createOrder(orderData);
            if (order.data.status === true) {
              toast.success(order.data.msg);
              handleClearCart();
              navigate("/order/success");
            } else {
              toast.error(order.data.msg);
            }
          } else {
            toast.error("Payment verification failed.");
            navigate("/checkout");
          }
        } catch (error) {
          console.log("Error verifying payment:", error);
          toast.error("Payment verification failed. Please try again.");
          navigate("/");
        }
      },
      theme: {
        color: "#5f63b8",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = couponCode;

    try {
      const res = await axios.get(`${server}/coupon/get-coupon-value/${name}`);
      const shopId = res.data.couponCode?.shopId;
      const couponCodeValue = res.data.couponCode?.value;
      if (res.data.couponCode !== null) {
        const isCouponValid = cart && cart.filter((item) => item.product.shopId === shopId);

        if (isCouponValid.length === 0) {
          toast.error("Coupon code is not valid for this shop");
          setCouponCode("");
        } else {
          const eligiblePrice = isCouponValid.reduce(
            (acc, item) => acc + item.quantity * item.product.price,
            0
          );
          const discountPrice = (eligiblePrice * couponCodeValue) / 100;
          setDiscountPrice(discountPrice);
          setCouponCodeData(res.data.couponCode);
          setCouponCode("");
        }
      } else {
        toast.error("Coupon code doesn't exist!");
        setCouponCode("");
      }
    } catch (error) {
      toast.error("Error validating coupon code");
      setCouponCode("");
    }
  };

  const paymentSubmit = async (isCod) => {
    const orderItems = cart.map(item => ({
      product: item.productId,
      name: item.productName,
      quantity: item.quantity,
      price: item.price,
      total: item.total,
      image: item.images
    }));

    const orderData = {
      shippingAddress,
      orderItems,
      paymentInfo: {
        method: isCod ? "COD" : "Online",
      },
      subTotalPrice,
      shippingPrice: shipping,
      totalPrice,
    };

    console.log("Order Data:", orderData);

    if (!isCod) {
      const amount = subTotalPrice;
      try {
        await handlePayment(amount, orderData);
      } catch (error) {
        toast.error("Something went wrong, please try again later.");
      }
    } else {
      try {
        const order = await createOrder(orderData);
        if (order.data.status === true) {
          toast.success(order.data.msg);
          handleClearCart();
          navigate("/order/success");
        } else {
          toast.error(order.data.msg);
        }
      } catch (error) {
        toast.error("Something went wrong, please try again later.");
      }
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
    } catch (error) {
      console.log("Error clearing cart:", error);
    }
  };

  const discountPercentage = couponCodeData ? discountPrice : "";

  return (
    <div className="flex justify-center items-center">
      <div className="w-full lg:w-1/2 mt-6">
        <CartData
          handleSubmit={handleSubmit}
          totalPrice={subTotalPrice}
          shipping={100}
          subTotalPrice={totalPrice}
          couponCode={couponCode}
          setCouponCode={setCouponCode}
          discountPercentage={discountPercentage}
        />
        <div className="flex justify-between w-full">
          <button
            className="w-full bg-gray-700 p-4 rounded-lg text-white font-semibold"
            onClick={() => paymentSubmit(true)}
          >
            Cash On Delivery
          </button>
          <button
            className="w-full bg-gray-700 p-4 ml-4 rounded-lg text-white font-semibold"
            onClick={() => paymentSubmit(false)}
          >
            Online Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;

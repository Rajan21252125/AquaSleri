/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
// import { server } from "../../server";
import ShippingInfo from "./ShippingInfo";
import CartData from "./CartData";
import { toast } from "react-toastify";
import useGetCart from "../customHook/useGetCart";
import { clearCart, orderapi, verifyPayment, viewCart } from "../api";

const Checkout = () => {
  const { user }  = useSelector((state) => state.userDetail);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const [ cart , setCart ] = useState(null);
  const navigate = useNavigate();


  const { totalPrice } = useGetCart();



  const fetchCart = async () => {
    try {
      const data = await viewCart();
      setCart(data?.data?.data)
    } catch (error) {
      console.log(error)
    }
  }




  // handlePayment Function
  const handlePayment = async (amount,orderData) => {
    try {
      const res = await orderapi(amount);
      handlePaymentVerify(res?.data?.data,orderData);
    } catch (error) {
      console.log(error);
    }
  };




  // handlePaymentVerify Function
  const handlePaymentVerify = async (data,orderData) => {
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

          const verifyData = verifyResponse.data;

          if (verifyData.message) {
            toast.success(verifyData.message);
            handleClearCart();
            navigate("/order/success");

          }
        } catch (error) {
          toast.error("Payment failed! Please try again or contact us for help!");
          console.log(error);
          navigate("/")
        }
      },
      theme: {
        color: "#5f63b8"
      }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };


  
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCart();
  }, []);



  // clear Cart 
  const handleClearCart = async () => {
    try {
      await clearCart();
    } catch (error) {
      console.log(error?.response?.data?.msg)
    }
  }



  const paymentSubmit = () => {
   if(address1 === "" || address2 === "" || zipCode === null || country === "" || city === ""){
      toast.error("Please choose your delivery address!")
   } else{
    const shippingAddress = {
      address1,
      address2,
      zipCode,
      country,
      city,
    };

    const orderData = {
      cart,
      totalPrice,
      subTotalPrice,
      shipping,
      discountPrice,
      shippingAddress,
      user : user._id,
    }
    handlePayment(subTotalPrice,orderData)
   }
  };

  // this is shipping cost variable
  const shipping = 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = couponCode;

    await axios.get(`${server}/coupon/get-coupon-value/${name}`).then((res) => {
      const shopId = res.data.couponCode?.shopId;
      const couponCodeValue = res.data.couponCode?.value;
      if (res.data.couponCode !== null) {
        const isCouponValid =
          cart && cart.filter((item) => item.shopId === shopId);

        if (isCouponValid.length === 0) {
          toast.error("Coupon code is not valid for this shop");
          setCouponCode("");
        } else {
          const eligiblePrice = isCouponValid.reduce(
            (acc, item) => acc + item.qty * item.discountPrice,
            0
          );
          const discountPrice = (eligiblePrice * couponCodeValue) / 100;
          setDiscountPrice(discountPrice);
          setCouponCodeData(res.data.couponCode);
          setCouponCode("");
        }
      }
      if (res.data.couponCode === null) {
        toast.error("Coupon code doesn't exists!");
        setCouponCode("");
      }
    });
  };

  const discountPercentenge = couponCodeData ? discountPrice : "";

  const subTotalPrice = totalPrice + shipping

  

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] lg:w-[70%] flex justify-between flex-col lg:flex-row">
        <div className="w-full md:w-full">
          <ShippingInfo
            user={user}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            address1={address1}
            setAddress1={setAddress1}
            address2={address2}
            setAddress2={setAddress2}
            zipCode={zipCode}
            setZipCode={setZipCode}
          />
        </div>
        <div className="md:w-full md:mt-0 mt-8">
          <CartData
            handleSubmit={handleSubmit}
            totalPrice={subTotalPrice}
            shipping={shipping}
            subTotalPrice={totalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentenge={discountPercentenge}
          />
        </div>
      </div>
      <div
        className="bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer' w-[150px] md:w-[70%] mt-10"
        onClick={paymentSubmit}
      >
        <h5 className="text-white">Go to Payment</h5>
      </div>
    </div>
  );
};
export default Checkout;

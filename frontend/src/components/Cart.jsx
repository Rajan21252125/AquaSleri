/* eslint-disable react/prop-types */
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import styles from "../styles/styles";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slice/cartSlice";
import CartSingle from "./CartSingle";
import { useEffect, useState } from "react";
import { clearCart, deleteOneCartItem, viewCart } from "../api";
import { toast } from "react-toastify";

const Cart = ({ setOpenCart }) => {
  const [value, setValue] = useState(1);
  const [cart, setCart] = useState([]);
  const [totalPrice,setTotalPrice] = useState("")
    // fetch cart items
  const fetchCart = async () => {
    try {
      const data = await viewCart();
      setTotalPrice(data?.data?.totalPrice)
      setCart(data?.data?.data)
    } catch (error) {
      // console.log(error)
    }
  }

  useEffect(() => {
    fetchCart();
  },[])

  const dispatch = useDispatch();

  const removeFromCartHandler = async(data) => {
    const productId = data?.productId
    try {
      const data = await deleteOneCartItem(productId);
      if (data?.data?.status === true) {
        fetchCart();
        toast.success(data?.data?.msg)
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg)
    }
  };


  const quantityChangeHandler = (data) => {
    dispatch(addToCart(data));
  };


  const handleClearCart = async () => {
    try {
      const data = await clearCart();
      setCart([])
      if (data?.data?.success === true) return toast.success(data?.data?.msg)
      return toast(data?.data?.msg)
    } catch (error) {
      toast.error(error?.response?.data?.msg)
    }
  }

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-50">
      <div className="fixed top-0 right-0 h-full w-full md:w-[30%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        {cart && cart.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
            </div>
            <h5>Cart Items is empty!</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-between items-center pt-3 pr-5">
                {/* Item length */}
                <div className={`${styles.noramlFlex} px-4`}>
                  <IoBagHandleOutline size={25} />
                  <h5 className="pl-2 text-[20px] font-[500]">
                    {cart && cart.length} items
                  </h5>
                </div>
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenCart(false)}
                />
              </div>

              {/* cart Single Items */}
              <br />
              <div className="w-full border-t">
                <div className="flex justify-end mx-5 mt-2">
                <button className="flex items-center justify-center bg-gray-800 text-white font-semibold py-2 px-4 rounded-md" onClick={handleClearCart}>Clear Cart</button>
                </div>
                {cart &&
                  cart.map((i, index) => (
                    <CartSingle
                      key={index}
                      data={i}
                      fetchCart={fetchCart}
                      quantityChangeHandler={quantityChangeHandler}
                      removeFromCartHandler={removeFromCartHandler}
                      value={value}
                      setValue={setValue}
                    />
                  ))}
              </div>
            </div>

            <div className="px-5 mb-3">
              {/* checkout buttons */}
              <Link to="/checkout">
                <div
                  className={`h-[45px] flex items-center justify-center w-[100%] bg-gray-800 rounded-[5px]`}
                >
                  <h1 className="text-[#fff] text-[18px] font-[600]">
                    Checkout Now (INR ₹{totalPrice})
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;

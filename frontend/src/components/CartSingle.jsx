import { useState } from "react";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import styles from "../styles/styles";

/* eslint-disable react/prop-types */
const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler , setValue , value}) => {
    
    
    const increment = (data) => {
      setValue(value + 1);
      const updateCartData = { ...data, quantity: value + 1 };
      quantityChangeHandler(updateCartData);
    };
    
    const decrement = (data) => {
      setValue(value - 1);
      quantityChangeHandler({ ...data, quantity: value - 1 });
    };

    const totalPrice = data?.discountedPrice * value;
  
    return (
      <div className="border-b p-4">
        <div className="w-full flex items-center">
          <div>
            <div
              className={`bg-gray-800 border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
              onClick={() => increment(data)}
            >
              <HiPlus size={18} color="#fff" />
            </div>
            <span className="pl-[10px]">{value}</span>
            <button
              className={`bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center ${value <= 1 ? "cursor-not-allowed" : "cursor-pointer"}`}
              onClick={() => decrement(data)}
              disabled={value <= 1}
            >
              <HiOutlineMinus size={16} color="#7d879c" />
            </button>
          </div>
          <img
            src={`${data?.images[0]}`}
            alt=""
            className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
          />
          <div className="pl-[5px]">
            <h1>{data?.name}</h1>
            <h4 className="font-[400] text-[15px] text-[#00000082]">
            ₹{data?.discountedPrice}
            </h4>
            <h4 className="font-[600] text-[17px] pt-[3px] text-gray-800 font-Roboto">
              INR ₹{totalPrice}
            </h4>
          </div>
          <RxCross1
            className="cursor-pointer"
            onClick={() => removeFromCartHandler(data)}
          />
        </div>
      </div>
    );
  };




  export default CartSingle;
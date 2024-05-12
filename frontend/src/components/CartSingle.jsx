import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import styles from "../styles/styles";
import { addToCartApi, deleteCartItem } from "../api";
import { toast } from "react-toastify";

/* eslint-disable react/prop-types */
const CartSingle = ({ data, removeFromCartHandler , fetchCart}) => {
    
    
    const increment = async (data) => {
      const cartData = [{
        productId: data.productId,
        images : data.images,
        productName: data.productName,
        price : data.price
      }]
      try {
        const data = await addToCartApi(cartData)
        if (data?.data?.status === true) {
          fetchCart();
          toast.success(data?.data?.msg)
        }
      } catch (error) {
        toast.error(error?.response?.data?.msg)
      }
    };
    
    const decrement = async (data) => {
      const productId = data?.productId
      try {
        const data = await deleteCartItem(productId);
        if (data?.data?.status === true) {
          fetchCart();
          toast.success(data?.data?.msg)
        }
      } catch (error) {
        toast.error(error?.response?.data?.msg)
      }
    };
  
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
            <span className="pl-[10px]">{data?.quantity}</span>
            <button
              className={`bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center ${data?.quantity <= 1 ? "cursor-not-allowed" : "cursor-pointer"}`}
              onClick={() => decrement(data)}
              disabled={data?.quantity <= 1}
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
            <h1>{data?.productName}</h1>
            <h4 className="font-[400] text-[15px] text-[#00000082]">
            ₹{data?.price}
            </h4>
            <h4 className="font-[600] text-[17px] pt-[3px] text-gray-800 font-Roboto">
              INR ₹{data?.total}
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
import { useEffect, useState } from "react";
import { viewCart } from "../api";

const useGetCart = () => {
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


  return {cart,totalPrice}
}



export default useGetCart;
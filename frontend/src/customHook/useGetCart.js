import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slice/cartSlice";
import { viewCart } from "../api";

const useGetCart = () => {
    const dispatch = useDispatch();
    // fetch cart items
  const fetchCart = async () => {
    try {
      const data = await viewCart();
    //   setCart(data?.data?.data || []);
    dispatch(addToCart(data?.data?.data || []));
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCart();
  },[])
}



export default useGetCart;
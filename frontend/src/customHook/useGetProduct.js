import { useEffect } from "react";
import { useDispatch , useSelector } from "react-redux";
import { setProducts } from "../store/slice/productSlice";
import { getProductList } from "../api";


const useGetProduct = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.products);

  const fetchData = async () => {
        try {
            if (productData.length > 0) return;
          const data = await getProductList();
          dispatch(setProducts(data?.data));
          return data;
        } catch (error) {
          return "getting some error";
        }
  }

  useEffect(() => {
    fetchData();
  }, []);
}


export default useGetProduct;
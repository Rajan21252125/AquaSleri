import { useDispatch } from "react-redux";
import { userData } from "../api";
import { setUser } from "../store/slice/userSlice";
import { useEffect } from "react";

const useUserDeatil = (token) => {
    const dispatch = useDispatch();
    const data = async () => {
        try {
            if(token){
                const data = await userData(token)
                dispatch(setUser(data?.data))
            }
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        data()
    },[token])
}



export default useUserDeatil;
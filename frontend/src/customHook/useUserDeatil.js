import { useDispatch } from "react-redux";
import { userData } from "../api";
import { setUser } from "../store/slice/userSlice";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

const useUserDeatil = () => {
    const [cookies] = useCookies([]);
    const dispatch = useDispatch();
    // console.log(cookies.token)
    const data = async () => {
        if (cookies) {
            const data = await userData()
            dispatch(setUser(data?.data))
        }
    }


    useEffect(() => {
        data()
    }, [cookies])
}



export default useUserDeatil;
import { useDispatch } from "react-redux";
import { userData } from "../api";
import { setUser } from "../store/slice/userSlice";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

const useUserDeatil = () => {
    const [cookies] = useCookies([]);
    const dispatch = useDispatch();
    const data = async () => {
        if (cookies) {
            try {
                const data = await userData()
                console.log(data)
                dispatch(setUser(data?.data))
            } catch (error) {
                // console.log(error)
            }
        }
    }


    useEffect(() => {
        data()
    }, [cookies])
}



export default useUserDeatil;
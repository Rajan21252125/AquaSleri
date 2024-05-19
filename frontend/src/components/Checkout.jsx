import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ShippingInfo from "./ShippingInfo";
import { toast } from "react-toastify";

const Checkout = () => {
  const { user }  = useSelector((state) => state.userDetail);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const navigate = useNavigate();

  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const proceedToPayment = () => {
    if (address1 === "" || address2 === "" || zipCode === null || country === "" || city === "") {
      toast.error("Please choose your delivery address!");
    } else {
      const shippingAddress = {
        address1,
        address2,
        zipCode,
        country,
        city,
      };
      navigate("/payment", { state: { shippingAddress } });
    }
  };


  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] lg:w-[70%] flex justify-between flex-col lg:flex-row">
        <div className="w-full md:w-full flex flex-col">
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
        <button className="bg-gray-700 p-4 rounded-lg font-semibold text-white text-balance hover:bg-gray-800" onClick={proceedToPayment}>Proceed To Pay</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { activateAccount } from "../api";
import { toast } from "react-toastify";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
        const response = async () => {
            try {
                const data = await activateAccount(activation_token)
                if (!data.status) return toast.error(data.msg)
                toast.success(data.msg)
                console.log(data)
            } catch (error) {
                toast.error(error.response.data.msg)
                setError(true)
            }
        }
        response()
  }
}, []);

  return (
    <div className="h-screen flex justify-center items-center">
      {error ? (
        <p>Your token is expired!</p>
      ) : (
        <p>Your account has been created suceessfully!</p>
      )}
    </div>
  );
};

export default ActivationPage;

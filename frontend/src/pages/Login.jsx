import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Navbar from "../components/Navbar";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { signUp, login, googleLogin, googleSignup } from "../api/index";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [toggleSignup, setToggleSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    phone: "",
  });

  const toggleSignupForm = () => {
    setToggleSignup(!toggleSignup);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const googleSuccess = async (res) => {
    if (toggleSignup) {
      try {
        const { data } = await googleSignup(res.credential);
        const token = data.token;
        navigate("/");
        localStorage.setItem("id", JSON.stringify(token));
        toast.success("Account created successfully");
      } catch (error) {
        console.log(error);
        toast.error("Error creating account");
      }
    } else {
      try {
        const { data } = await googleLogin(res.credential);
        const token = data.token;
        navigate("/");
        localStorage.setItem("id", JSON.stringify(token));
        toast.success("Logged in successfully");
      } catch (error) {
        console.log(error);
        toast.error("Error logging in");
      }
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In Failure");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (toggleSignup) {
        const { data } = await signUp(formData);
        const token = data.token;
        navigate("/");
        localStorage.setItem("id", JSON.stringify(token));
        toast.success("Account created successfully");
      } else {
        const { data } = await login(formData);
        const token = data.token;
        navigate("/");
        localStorage.setItem("id", JSON.stringify(token));
        toast.success("Logged in successfully");
      }
    } catch (error) {
      console.log(error?.response?.data?.msg);
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <>
      <Navbar />
      <section className="md:h-[calc(100vh-7rem)] pb-20 flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-16 md:my-0 md:items-center md:justify-center">
        <div className="md:w-1/3 max-w-sm hidden md:block">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            alt="Sample image"
          />
        </div>
        <div className="md:w-1/3 max-w-sm px-4">
          <div className="text-left">
            <label className="mr-1 text-2xl font-bold">
              {toggleSignup ? "Sign in" : "Log in"}
            </label>{" "}
            <br />
            <GoogleLogin
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="w-full border border-black py-4 rounded-md font-semibold flex items-center justify-center"
                >
                  <FcGoogle className="mr-2 text-xl" /> Google Sign In
                </button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
          </div>
          <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
              Or
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              {toggleSignup && (
                <div>
                  <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                    type="text"
                    placeholder="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  <input
                    className="text-sm w-full px-4 py-2 mt-4 border border-solid border-gray-300 rounded"
                    type="text"
                    placeholder="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>

            <input
              className="text-sm w-full px-4 py-2 mt-4 border border-solid border-gray-300 rounded"
              type="text"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <div className="mt-4 flex justify-between font-semibold text-sm">
              <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                <input
                  className="mr-1"
                  type="checkbox"
                  onClick={togglePassword}
                />
                <span>Show Password</span>
              </label>
              {!toggleSignup && (
                <a
                  className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
                  href="#"
                >
                  Forgot Password?
                </a>
              )}
            </div>
            <div className="text-center md:text-left">
              <button
                className="mt-4 bg-blue-600 w-full hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                type="submit"
              >
                {toggleSignup ? "Sign-In" : "Login"}
              </button>
            </div>
          </form>
          <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
            {toggleSignup
              ? "Already have an account ?"
              : "Don't have an account?"}{" "}
            <button
              className="text-red-600 hover:underline hover:underline-offset-4"
              onClick={toggleSignupForm}
            >
              {toggleSignup ? "Login" : "Register"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;

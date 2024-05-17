import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Navbar from "../components/Navbar";
import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { signUp, login, googleLogin, googleSignup } from "../api/index";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [toggleSignup, setToggleSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    phoneNumber: "",
  });
  const [cookies] = useCookies([]);
  const roleData = localStorage.getItem("role");
  console.log(roleData);

  const toggleSignupForm = () => {
    setToggleSignup(!toggleSignup);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const googleSuccess = async (res) => {
    if (toggleSignup) {
      try {
        setLoading(true);
        const { data } = await googleSignup(res.credential);
        localStorage.setItem("role", data?.role);
        localStorage.setItem("typeOfUser", "true");
        if (data?.role === "admin") {
          return navigate("/admin");
        }
        navigate("/");
        toast.success("Signup Successfully");
      } catch (error) {
        console.log(error);
        toast.error("Error creating account");
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        const { data } = await googleLogin(res.credential);
        localStorage.setItem("role", data?.role);
        localStorage.setItem("typeOfUser", "true");
        if (data?.role === "admin") {
          return navigate("/admin");
        }
        navigate("/");
        toast.success("Logged in successfully");
      } catch (error) {
        console.log(error);
        toast.error("Error logging in");
      } finally {
        setLoading(false);
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
    if (cookies.token) {
      return navigate("/");
    }
    e.preventDefault();
    try {
      setLoading(true);
      if (toggleSignup) {
        const { data } = await signUp(formData);
        localStorage.setItem("token", data?.token);
        localStorage.setItem("typeOfUser", "false");
        navigate("/login");
        toast.success(data?.msg);
      } else {
        const { data } = await login(formData);
        if (data?.isVerified === false) {
          return toast.error("Please verify your email");
        }
        localStorage.setItem("token", data?.token);
        localStorage.setItem("typeOfUser", "false");
        navigate("/");
        toast.success(data?.msg);
      }
    } catch (error) {
      console.log(error?.response?.data?.msg);
      toast.error(error?.response?.data?.msg);
    } finally {
      setLoading(false);
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
                    className="text-sm w-full px-4 mt-4 py-2 border border-solid border-gray-300 rounded"
                    type="tel"
                    placeholder="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    pattern="[0-9]{10}"
                    inputMode="numeric"
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
                <Link
                  to={"/forgot-password"}
                  className="text-blue-600 hover:text-blue-700 cursor-pointer hover:underline hover:underline-offset-4"
                >
                  Forgot Password?
                </Link>
              )}
            </div>
            <div className="text-center md:text-left">
              <button
                className="mt-4 bg-blue-600 w-full hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                type="submit"
              >
                {toggleSignup
                  ? loading
                    ? "Signing In...."
                    : "Sign-In"
                  : loading
                  ? "Logging In...."
                  : "Login"}
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

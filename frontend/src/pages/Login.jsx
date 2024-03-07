import { useState } from "react";
import { FcGoogle } from "react-icons/fc";



const Login = () => {
  const [signIn , setSignIn] = useState(false);
  const [ showPassword , setShowPassword ] = useState(false);
  const toggleLogin = () => {
    setSignIn(!signIn);
  };
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  
  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 my-2 mx-5 md:mx-0 md:my-0 md:items-center">
      <div className="md:w-1/3 max-w-sm hidden md:block">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <div className="text-center md:text-left">
          <label className="mr-1 text-2xl font-bold">{signIn ? "Sign in" : "Log in"}</label> <br />
          <button className="w-full border border-black mt-2 py-2 rounded-md font-semibold flex items-center justify-center"><FcGoogle className="mr-2 text-xl"/> Google</button>
        </div>
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
            Or
          </p>
        </div>
        {signIn && <input
          className="text-sm w-full mb-4 px-4 py-2 border border-solid border-gray-300 rounded"
          type="text"
          placeholder="Full Name"
        />}
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
          type="text"
          placeholder="Email Address"
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
        />
        <div className="mt-4 flex justify-between font-semibold text-sm">
          <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
            <input className="mr-1" type="checkbox" onClick={togglePassword}/>
            <span>Show Password</span>
          </label>
          {!signIn && <a
            className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
            href="#"
          >
            Forgot Password?
          </a>}
        </div>
        <div className="text-center md:text-left">
          <button
            className="mt-4 bg-blue-600 w-full hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            type="submit"
          >
            {signIn ? "Sign-In" : "Login"}
          </button>
        </div>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          {signIn ? "Already have an account ?" : "Don't have an account?"}{" "}
          <button
            className="text-red-600 hover:underline hover:underline-offset-4"
            onClick={toggleLogin}
          >
            {signIn ? "Login" : "Register"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;
// import React from 'react'
import { ImEye } from "react-icons/im";
import { RiEyeCloseFill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { logInUserAPI } from "@/helper/API/user";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login_Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    // Check if a message was passed via navigate
    if (location.state?.message) {
      toast.success(location.state.message);
    }
  }, [location]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const imageUrl =
    "https://img.freepik.com/premium-photo/hospital-hallway-unfocused-background_786878-6945.jpg?size=626&ext=jpg&ga=GA1.1.1289161518.1725302723&semt=ais_hybrid";

  const inputChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    const { username: email, password } = user;
    if (!email || !password) {
      toast.error("Enter all the fields!!!");
      return false;
    }
    const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format.");
      return false;
    }
    return true;
  };          

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isFormValid()) {
        const loginAPIresponse = await dispatch(
          logInUserAPI({ email: user.username, password: user.password })
        ).unwrap();

        if (loginAPIresponse) {
          navigate("/user/dashboard", {
            state: {
              message: "You'hv been successfully loggedin...",
            },
          });
        }
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Invalid credentials");
    }
  };

  return (
    <div
      className="relative w-full h-[88%] flex flex-col items-center justify-center"
      // style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <ToastContainer />
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 shadow-lg shadow-[#005CC8] w-1/4 border-[#005CC8] border-4 rounded-md mx-auto px-2 py-5 "
      >
        <div className="w-full flex justify-center">
          <h1 className="shadow-lg shadow-[#005CC8] text-xl font-bold text-black underline border-4 border-[#3c97ff] bg-[#005CC8] px-2 py-1 rounded-full text-white hover:text-black">
            Login-Form
          </h1>
        </div>
        <div className="input-container flex flex-col">
          <label htmlFor="name" className="text-xl font-bold text-black">
            Username:{" "}
          </label>
          <input
            type="email"
            placeholder="Enter your email..."
            name="username"
            value={user.username}
            onChange={inputChangeHandler}
            className="bg-[#0077ff94] px-2 font-semibold placeholder-[#005CC8] text-white focus:outline-none"
          />
        </div>
        <div className="input-container flex flex-col">
          <label htmlFor="name" className="text-xl font-bold text-black">
            Password:{" "}
          </label>
          <div className="relative flex">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password..."
              name="password"
              value={user.password}
              onChange={inputChangeHandler}
              className="w-full bg-[#0077ff94] px-2 font-semibold placeholder-[#005CC8] text-white focus:outline-none"
            />
            <div
              className="absolute right-0 cursor-pointer text-xl m-[2px] mr-1"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <ImEye /> : <RiEyeCloseFill />}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-4">
          {/* <button className="hover:bg-white hover:border-secondary active:scale-110 hover:text-black rounded-3xl px-5 py-1 border-2 bg-secondary text-white text-xl font-bold">
            Login
          </button> */}
          <Button>Login</Button>
          <Link
            to="/search/username"
            className="relative z-10 text-black text-sm font-semibold hover:text-primary hover:underline hover"
          >
            Forgotten password?
          </Link>
        </div>
      </form>
      <Link
        to="/register"
        className="relative z-10 text-black text-sm font-semibold hover:text-primary hover:underline hover"
      >
        Not have an account ? Register then...
      </Link>
    </div>
  );
};

export default Login_Form;

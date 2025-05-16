// import React from "react";

import { Button } from "@/components/ui/button";
import { mailerAPI, searchUsername } from "@/helper/API/user";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Username = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
  });

  const isFormValid = () => {
    const { username } = user;
    if (!username) {
      toast.error("Enter all the fields!!!");
      return false;
    }
    const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    if (!emailRegex.test(username)) {
      toast.error("Invalid email format.");
      return false;
    }
    return true;
  };

  const inputChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isFormValid()) {
        const response = await dispatch(searchUsername(user)).unwrap();

        if (response) {
          const token = JSON.parse(localStorage.getItem("token"));
          if (token) {
            const decode = jwtDecode(token);
            if (decode) {
              dispatch(
                mailerAPI({
                  userName: decode.userName,
                  userEmail: decode.userEmail,
                  text: `Your OTP (One-Time Password) for "Password updation" is: ${decode.otp} Please enter this OTP within 10 minutes to complete the procedure. If you did not request this OTP, please ignore this email.`,
                  subject: "Your OTP for Password Update Request in HMS-MERCY",
                })
              );

              navigate("/register/otp-verify", {
                state: {
                  message: "OTP has been sent on your mail...",
                },
              });
            }
          }
        }
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Username not found. Try with correct one!!!");
    }
  };

  const imageUrl =
    "https://img.freepik.com/premium-photo/hospital-hallway-unfocused-background_786878-6945.jpg?size=626&ext=jpg&ga=GA1.1.1289161518.1725302723&semt=ais_hybrid";
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
            Search-Form
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

        <div className="flex flex-col items-center justify-center mt-4">
          {/* <button className="hover:bg-white hover:border-secondary active:scale-110 hover:text-black rounded-3xl px-5 py-1 border-2 bg-secondary text-white text-xl font-bold">
                Login
              </button> */}
          <Button>Search</Button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Username;

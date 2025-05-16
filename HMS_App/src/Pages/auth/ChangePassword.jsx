// import React from 'react'
import { ImEye } from "react-icons/im";
import { RiEyeCloseFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeLoggedOutUserPassword, mailerAPI } from "@/helper/API/user";
import { jwtDecode } from "jwt-decode";

const ChangePassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setpassword] = useState({
    newPassword1: "",
    newPassword2: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    // Check if a message was passed via navigate
    if (location.state?.message) {
      toast.success(location.state.message);
    }
  }, [location]);

  const isFormValid = () => {
    const { newPassword1, newPassword2 } = password;

    if (!newPassword1.trim() || !newPassword2.trim()) {
      toast.error("Enter all the fields!!!");
      return false;
    }

    if (newPassword1 != newPassword2) {
      toast.error("New Passwords do not match. Please try again!!!");
      return false;
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
    if (!passwordRegex.test(newPassword1)) {
      toast.error(
        "Invalid new password. It must be 8-10 characters with uppercase, lowercase, digit, and special character."
      );
      return false;
    }

    return true;
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const inputChangeHandler = (e) => {
    setpassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isFormValid()) {
        const response = await dispatch(
          changeLoggedOutUserPassword({ newPassword: password?.newPassword1 })
        ).unwrap();

        if (response) {
          const token = JSON.parse(localStorage.getItem("token"));
          const decode = await jwtDecode(token);
          if (token && decode) {
            const mailerResponse = await dispatch(
              mailerAPI({
                userName: decode?.userName?.split(" ")[0],
                userEmail: decode?.userEmail,
                text: `We wanted to let you know that your password for your account on HMS_Mercy was successfully changed.
    
    If you made this change, no further action is required. Your updated password is now active, and you can use it the next time you log in.
    
    If you did not request this change, please contact us immediately at this email. Our team will help secure your account and assist with resetting your password.
    
    For the security of your account, we recommend:
    
    Choosing a strong, unique password,
    Not sharing your password with anyone,
    
    Thank you for being part of HMS_Mercy.
    
    Best regards,
    HMS_Mercy`,
                subject: "Your Password Has Been Successfully Changed...",
              })
            ).unwrap();

            if (mailerResponse) {
              toast.success("Password changed successfully...");
              localStorage.removeItem("token");
              navigate("/login", {
                state: {
                  message: "Password updated successfully...",
                },
              });
            }
          }
          toast.success("Password changed successfully");
        }
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const imageUrl =
    "https://img.freepik.com/premium-photo/hospital-hallway-unfocused-background_786878-6945.jpg?size=626&ext=jpg&ga=GA1.1.1289161518.1725302723&semt=ais_hybrid";

  return (
    <div className="relative w-full h-[88%] flex flex-col items-center justify-center">
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
            Password_Change-Form
          </h1>
        </div>
        <div className="input-container flex flex-col">
          <label htmlFor="name" className="text-xl font-bold text-black">
            New Password{" "}
          </label>
          <div className="relative flex">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your new password..."
              name="newPassword1"
              value={password?.newPassword1}
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
        <div className="input-container flex flex-col">
          <label htmlFor="name" className="text-xl font-bold text-black">
            New Password{" "}
          </label>
          <div className="relative flex">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter password again..."
              name="newPassword2"
              value={password?.newPassword2}
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
          <Button>Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;

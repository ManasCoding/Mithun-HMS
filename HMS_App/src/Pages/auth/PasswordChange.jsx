// import React from 'react'
import { ImEye } from "react-icons/im";
import { RiEyeCloseFill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { mailerAPI, updateUserPassword } from "@/helper/API/user";

const PasswordChange = () => {
  const { user } = useSelector((state) => state.user);
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword1: "",
    newPassword2: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const inputChangeHandler = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    const { oldPassword, newPassword1, newPassword2 } = password;

    if (!oldPassword.trim() || !newPassword1.trim() || !newPassword2.trim()) {
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

    if (newPassword1 == oldPassword) {
      toast.error("Old and new password cannot be same!!!");
      return false;
    }

    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (isFormValid()) {
        const response = await dispatch(
          updateUserPassword({
            oldPassword: password.oldPassword,
            newPassword: password.newPassword1,
          })
        ).unwrap();

        if (response) {
          dispatch(
            mailerAPI({
              userName: user.firstName,
              userEmail: user.email,
              text: `We wanted to let you know that your password for your account on HMS_Mercy was successfully changed.

If you made this change, no further action is required. Your updated password is now active, and you can use it the next time you log in.

If you did not request this change, please contact us immediately at this email. Our team will help secure your account and assist with resetting your password.

For the security of your account, we recommend:

Choosing a strong, unique password,
Not sharing your password with anyone,

Thank you for being part of HMS_Mercy.

Best regards,
HMS_Mercy`,
              subject: "Your Password Has Been Successfully updated...",
            })
          ).unwrap();

          navigate("/user/dashboard", {
            state: {
              message: "Password updated successfully...",
            },
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const imageUrl =
    "https://plus.unsplash.com/premium_photo-1681843126728-04eab730febe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div className="w-full h-screen bg p-10 flex items-center justify-center">
      <ToastContainer />
      <div className="relative w-[60%] p-5 mt-16 shadow-lg shadow-black">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-[3px]"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        <form
          onSubmit={submitHandler}
          className="relative z-10 w-full border-[3px] border-[#0077ff94] bg-[#ffffff88] rounded-md p-2 px-6"
        >
          <div className="relative w-full h-10 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">Old Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter old password here..."
              name="oldPassword"
              value={password?.oldPassword}
              onChange={inputChangeHandler}
              className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"
            />

            <div
              className="absolute right-0 cursor-pointer m-2 text-xl"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <ImEye /> : <RiEyeCloseFill />}
            </div>
          </div>
          <div className="relative w-full h-10 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">New Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              name="newPassword1"
              placeholder="Enter new password here..."
              value={password?.newPassword1}
              onChange={inputChangeHandler}
              className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"
            />
            <div
              className="absolute right-0 cursor-pointer m-2 text-xl"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <ImEye /> : <RiEyeCloseFill />}
            </div>
          </div>
          <div className="relative w-full h-10 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">New Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter again new password here..."
              name="newPassword2"
              value={password?.newPassword2}
              onChange={inputChangeHandler}
              className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"
            />
            <div
              className="absolute right-0 cursor-pointer m-2 text-xl"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <ImEye /> : <RiEyeCloseFill />}
            </div>
          </div>

          <div className="w-full h-10 flex items-center justify-center py-1 mt-2">
            <Button>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordChange;

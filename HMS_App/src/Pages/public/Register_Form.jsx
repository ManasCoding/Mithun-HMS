import { ImEye } from "react-icons/im";
import { RiEyeCloseFill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { mailerAPI, registerAPI } from "@/helper/API/user";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register_Form = () => {
  const { userType } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const Dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    email: "",
    pin: "",
    password1: "",
    password2: "",
  });

  function generateRandomNumber(digits) {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    if (userType === "P") {
      setUser({ ...user, pin: generateRandomNumber(6) });
    } else {
      setUser({ ...user, pin: "" });
    }
  }, [userType]);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const imageUrl =
    "https://img.freepik.com/premium-photo/hospital-hallway-unfocused-background_786878-6945.jpg?size=626&ext=jpg&ga=GA1.1.1289161518.1725302723&semt=ais_hybrid";

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const isFormValid = () => {
    const { name, email, password1, password2 } = user;

    if (userType === "A" || userType === "D" || userType === "P") {
      if (!name || !email || !password1 || !password2) {
        toast.error("Enter all the fields!!!");
        return false;
      }
    }

    // if (userType === "A" && pin !== "200114") {
    //   toast.error("Incorrect admin pin.");
    //   return false;
    // } else if (userType === "D" && pin !== "411002") {
    //   toast.error("Incorrect doctor pin.");
    //   return false;
    // }

    // const passwordRegex = 
    //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$[1-9]/;
    // if (!passwordRegex.test(password1)) {
    //   toast.error(
    //     "Invalid password. Must be 8-10 characters with uppercase, lowercase, digit, and special character."
    //   );
    //   return false;
    // }

    if (password1 !== password2) {
      toast.error("Passwords do not match.");
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
    try {
      e.preventDefault();
      if (isFormValid()) {
        if (userType == "A" || userType == "D") {
          const registerAPIResponse = await Dispatch(
            registerAPI({
              username: user.name,
              email: user.email,
              password: user.password1,
              usertype: userType,
            })
          ).unwrap();
          console.log(user.name);
          console.log(user.email);
          console.log(user.password1);
          console.log(userType);
          
          
          
          

          if (registerAPIResponse) {
            const token = JSON.parse(localStorage.getItem("token"));
            if (token) {
              const decode = jwtDecode(token);
              if (decode) {
                toast.promise(
                  Dispatch(
                    mailerAPI({
                      userName: user.name,
                      userEmail: user.email,
                      text: `Your OTP (One-Time Password) for "Registration-Verification" is: ${decode.otp} Please enter this OTP within 10 minutes to complete your verification. If you did not request this OTP, please ignore this email.`,
                      subject: "Registration verification in HMS-MERCY Portal",
                    })
                  ),
                  {
                    loading: "Processing...",
                    success: "Registration successful.",
                    error: "Registration failed...",
                  }
                );

                navigate("/register/otp-verify", {
                  state: {
                    message: "Verification mail has been sent on your mail...",
                  },
                });
              }
            }
          }
        } else if (userType == "P") {
          // console.log(user);
          const registerAPIResponse = await Dispatch(
            registerAPI({
              username: user.name,
              email: user.email,
              patientId: user.pin,
              password: user.password1,
              usertype: userType,
            })
          ).unwrap();

          if (registerAPIResponse) {
            navigate("/login", {
              state: {
                message: "Welcome mail has been sent on your mail...",
              },
            });
          }
        }
      }
    } catch (error) {
      // Handle any errors from the API call
      toast.error(`User registration failed. ${error.message}`);
      console.log(error);
    }
  };

  return (
    <div
      className="relative w-full h-[88%] flex flex-col items-center justify-center"
      // style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <form
        onSubmit={handleSubmit}
        className="relative z-10 shadow-lg shadow-[#005CC8] w-1/4 border-[#005CC8] border-4 rounded-md mx-auto  px-2 py-5  "
      >
        <div className="w-full flex justify-center">
          <h1 className="shadow-lg shadow-[#005CC8] text-xl font-bold text-black underline border-4 border-[#3c97ff] bg-[#005CC8] px-2 py-1 rounded-full text-white hover:text-black">
            {userType === "A"
              ? "Admin-"
              : userType === "D"
              ? "Doctor-"
              : "Patient-"}
            Register-Form
          </h1>
        </div>
        <div className="input-container flex flex-col">
          <label htmlFor="name" className="text-xl font-bold text-black">
            Name:{" "}
          </label>
          <input
            type="text"
            placeholder="Enter your name..."
            name="name"
            value={user.name}
            onChange={inputChangeHandler}
            className="bg-[#0077ff94] font-semibold px-2 placeholder-[#005CC8] text-white focus:outline-none"
          />
        </div>
        <div className="input-container flex flex-col">
          <label htmlFor="name" className="text-xl font-bold text-black">
            Email:{" "}
          </label>
          <input
            type="email"
            placeholder="Enter your email..."
            name="email"
            value={user.email}
            onChange={inputChangeHandler}
            className="bg-[#0077ff94] px-2 font-semibold placeholder-[#005CC8] text-white focus:outline-none"
          />
        </div>
        {/* {userType === "A" || userType === "D" ? (
          <div className="input-container flex flex-col">
            <label htmlFor="name" className="text-xl font-bold text-black">
              {userType == "A" ? "Admin" : "Doctor"}-Pin:{" "}
            </label>
            <input
              type="number"
              placeholder="Enter your admin pin..."
              name="pin"
              value={user.pin}
              onChange={inputChangeHandler}
              className="bg-[#0077ff94] px-2 font-semibold placeholder-[#005CC8] text-white focus:outline-none"
            />
          </div>
        ) : (
          ""
        )} */}
        {userType === "P" ? (
          <div className="input-container flex flex-col">
            <label htmlFor="name" className="text-xl font-bold text-black">
              Patient-Id:{" "}
            </label>
            <input
              readOnly
              type="number"
              placeholder="Enter your admin pin..."
              name="pin"
              value={user.pin}
              onChange={inputChangeHandler}
              className="bg-[#0077ff94] px-2 font-semibold placeholder-[#005CC8] text-white focus:outline-none"
            />
          </div>
        ) : (
          ""
        )}

        <div className="input-container flex flex-col">
          <label htmlFor="name" className="text-xl font-bold text-black">
            Password:{" "}
          </label>
          <div className="relative flex">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password..."
              name="password1"
              value={user.password1}
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
            Re-Enter Password:{" "}
          </label>
          <div className="relative flex">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Re-enter your password..."
              name="password2"
              value={user.password2}
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
            User-Type:{" "}
          </label>
          <input
            type="text"
            placeholder="Re-enter your password..."
            name="userType"
            value={
              userType === "A"
                ? "Admin"
                : userType === "D"
                ? "Doctor"
                : "Patient"
            }
            readOnly
            disabled
            onChange={inputChangeHandler}
            className="bg-[#0077ff94] px-2 font-semibold placeholder-[#005CC8] text-white focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-center mt-4">
          {/* <button className="bg-secondary text-white active:scale-110 rounded-3xl hover:bg-white hover:text-black px-3 py-2 border-2 border-secondary text-xl font-bold">
            Register
          </button> */}
          <Button>Register</Button>
        </div>
      </form>
      <Link
        to="/login"
        className="relative z-10 text-black text-sm font-semibold hover:text-primary hover:underline hover"
      >
        Already have an account ? Login then...
      </Link>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Register_Form;

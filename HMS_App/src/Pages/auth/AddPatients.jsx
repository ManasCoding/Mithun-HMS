import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { addPatient, mailerAPI } from "@/helper/API/user";

const AddPatients = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [patientDetails, setpatientDetails] = useState({
    fullName: "",
    email: "",
    patientId: "",
    dob: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    diagnosis: "",
    prescription: "",
    condition: "",
    password: "",
  });

  function generateRandomNumber(digits) {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    if (user.usertype === "Admin" || user.usertype === "Patient") {
      navigate(-1);
    }
    let newPassword = "Pat@";
    setpatientDetails({
      ...patientDetails,
      password: newPassword + generateRandomNumber(4),
      patientId: generateRandomNumber(4),
    });
  }, [navigate]);

  const inputChangeHandler = (e) => {
    setpatientDetails({ ...patientDetails, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    const {
      patientId,
      fullName,
      gender,
      phone,
      address,
      email,
      password,
      dob,
      diagnosis,
      prescription,
      condition,
    } = patientDetails;
    if (
      !patientId ||
      !fullName?.trim() ||
      !email?.trim() ||
      !password?.trim() ||
      !gender?.trim() ||
      !phone?.trim() ||
      !address?.trim() ||
      !dob?.trim() ||
      !diagnosis?.trim() ||
      !prescription?.trim() ||
      !condition?.trim()
    ) {
      toast.error("Enter all the fields!!!");
      return false;
    }

    // setAge(patientDetails.dob);

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Invalid password. Must be 8-10 characters with uppercase, lowercase, digit, and special character."
      );
      return false;
    }

    const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format.");
      return false;
    }

    if (phone.length != 10) {
      toast.error("Invalid phone no. It must be 10 digits.");
      return false;
    }

    return true;
  };

  const selectGenderChangeHandler = (data) => {
    setpatientDetails({ ...patientDetails, gender: data });
  };
  const selectConditionChangeHandler = (data) => {
    setpatientDetails({ ...patientDetails, condition: data });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (isFormValid()) {
        const todayDate = new Date();
        const birthDate = new Date(patientDetails.dob);
        let age = todayDate.getFullYear() - birthDate.getFullYear() + " years";
        // Adjust if the birthday hasn't occurred yet this year
        const monthDiff = todayDate.getMonth() - birthDate.getMonth();
        const dayDiff = todayDate.getDate() - birthDate.getDate();

        if (age == "0 years") {
          age = monthDiff + " months";
        }

        if (age == "0 months") {
          age = dayDiff + " days";
        }

        const response = await dispatch(
          addPatient({ ...patientDetails, age })
        ).unwrap();

        if (response && response?.patientCreation) {
          await dispatch(
            mailerAPI({
              userName: patientDetails.fullName,
              userEmail: patientDetails.email,
              text: `Dear ${patientDetails.fullName},

We are pleased to confirm your registration and provide you with the details of your today's appointment.

Your account has been successfully created, and you can now access all our features. Here are your account details:

Account Details:
Email: ${patientDetails.email}
Password: ${patientDetails.password}

Appointment Details: 

Appointment ID: ${patientDetails?.patientId}
Doctor: Dr. ${user?.firstName}
Date: ${new Date().toString().split(" ").slice(0, 4).join(" ")}
Diagnosis: ${patientDetails?.diagnosis}
Prescription: ${patientDetails?.prescription}

Follow-Up Instructions: If Dr. ${
                user?.firstName
              } provided you with specific instructions or medications, please ensure to follow them carefully. Should you have any further questions or experience any issues related to your diagnosis, feel free to reach out to our clinic.

Next Steps: If a follow-up appointment or additional treatment is recommended, please schedule your next visit at your convenience by contacting our office or visiting our website.
To get started, please log in to your account using the above credentials and have a look into your appointment details. Should you need any assistance, our support team is here to help.
Thank you for trusting us with your healthcare. We look forward to assisting you in the future.
`,
              subject:
                "Successfully account creation and appointment registration!",
            })
          ).unwrap();

          navigate("/user/appointments", {
            state: {
              message:
                "Appointment registered and patient creation successfully...",
            },
          });
        } else if (response && !response?.patientCreation) {
          await dispatch(
            mailerAPI({
              userName: patientDetails.fullName,
              userEmail: patientDetails.email,
              text: `Dear ${patientDetails.fullName},

We hope this message finds you well. We’re writing to confirm that your appointment scheduled today with Dr. ${
                user?.firstName
              } has been successfully completed.

Appointent Details:

Appointment ID: ${patientDetails?.patientId}
Doctor: Dr. ${user?.firstName}
Date: ${new Date().toString().split(" ").slice(0, 4).join(" ")}
Diagnosis: ${patientDetails?.diagnosis}
Prescription: ${patientDetails?.prescription}

Follow-Up Instructions: If Dr. ${
                user?.firstName
              } provided you with specific instructions or medications, please ensure to follow them carefully. Should you have any further questions or experience any issues related to your diagnosis, feel free to reach out to our clinic.

Next Steps: If a follow-up appointment or additional treatment is recommended, please schedule your next visit at your convenience by contacting our office or visiting our website.

Thank you for trusting us with your healthcare. We look forward to assisting you in the future.`,
              subject: "Your Appointment Today Has Been Completed Successfully",
            })
          ).unwrap();
          navigate("/user/appointments", {
            state: {
              message: "Appointment registered successfully...",
            },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const imageUrl =
    "https://plus.unsplash.com/premium_photo-1681843126728-04eab730febe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div className="w-full h-screen bg p-10 flex items-center justify-center">
      <ToastContainer />
      <div className="relative h-[90%] w-[70%] p-5 mt-16 shadow-lg shadow-black">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-[3px]"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        <form
          onSubmit={submitHandler}
          className="relative z-10 h-full w-full border-[3px] border-[#0077ff94] bg-[#ffffff88] rounded-md p-2 px-6 overflow-hidden overflow-y-auto"
        >
          <div className="w-full flex justify-center items-center text-lg font-alice font-bold mb-4">
            <span className="shadow-lg shadow-[#0077ff94] rounded-md border-[3px] text-white border-[#0077ff94] px-1 py-2 bg-[#0077ff94] hover:bg-transparent hover:text-black transition-all duration-300 relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left">
              Patient Appointment Form
            </span>
          </div>
          <div className="text-lg text-red-500 font-medium relative w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-red-500 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left">
            Appointment No:{" "}
            <span className="font-bold">{patientDetails?.patientId}</span>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">Full Name</label>
            <input
              type="text"
              placeholder="Enter patient's full name..."
              name="fullName"
              value={patientDetails?.fullName}
              onChange={inputChangeHandler}
              className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"
            />
          </div>

          <div className="w-full h-10 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">Gender</label>
            <div className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm overflow-hidden">
              <Select
                onValueChange={selectGenderChangeHandler}
                defaultValue={patientDetails?.gender || ""}
              >
                <SelectTrigger className="pl-0 text-base h-full rounded-none border-none bg-[#d0cdcdb6]">
                  <SelectValue placeholder="Select patient's gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">DOB</label>
            <input
              type="date"
              placeholder="Enter patient's DOB..."
              name="dob"
              value={patientDetails?.dob}
              onChange={inputChangeHandler}
              className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"
            />
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">Email</label>
            <input
              type="email"
              placeholder="Enter patient's email..."
              name="email"
              value={patientDetails?.email}
              onChange={inputChangeHandler}
              className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"
            />
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">Phone</label>
            <input
              type="text"
              placeholder="Enter patient's phone number..."
              name="phone"
              value={patientDetails?.phone}
              onChange={inputChangeHandler}
              className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"
            />
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">Address</label>
            <input
              type="text"
              placeholder="Enter patient's address..."
              name="address"
              value={patientDetails?.address}
              onChange={inputChangeHandler}
              className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"
            />
          </div>
          <div className="w-full h-20 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">Diagnosis</label>
            <textarea
              name="diagnosis"
              placeholder="Enter patient's diagnosis/symptoms here..."
              value={patientDetails?.diagnosis}
              onChange={inputChangeHandler}
              className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"
            ></textarea>
          </div>
          <div className="w-full h-20 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">Prescription</label>
            <textarea
              name="prescription"
              placeholder="Enter patient's prescription here..."
              value={patientDetails?.prescribtion}
              onChange={inputChangeHandler}
              className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"
            ></textarea>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">Condition</label>
            <div className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm overflow-hidden">
              <Select
                onValueChange={selectConditionChangeHandler}
                defaultValue={patientDetails?.condition || ""}
              >
                <SelectTrigger className="pl-0 text-base h-full rounded-none border-none bg-[#d0cdcdb6]">
                  <SelectValue placeholder="Select patient's condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="InPatient">InPatient</SelectItem>
                  <SelectItem value="OutPatient">OutPatient</SelectItem>
                </SelectContent>
              </Select>
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

export default AddPatients;

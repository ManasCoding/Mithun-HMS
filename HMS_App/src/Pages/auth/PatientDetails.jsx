// import React from 'react'
import { getPatientDetails } from "@/helper/API/user";
import avatar from "../../assets/profile.png";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const PatientDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { patientDetails: user } = useSelector((state) => state.user);
  const [patient, setPatient] = useState({
    name: "",
    id: "",
    age: "",
    dob: "",
    gender: "",
    email: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    const fetchPatientDetails = async () => {
      if (location?.state) {
        if (!user?.patient) {
          await dispatch(
            getPatientDetails({ patient_id: location?.state?.patient_id })
          );
        }
      }
    };
    fetchPatientDetails();
    // console.log(user);
  }, [dispatch, location, user]);

  useEffect(() => {
    if (user) {
      setPatient({
        ...patient,
        name: user?.patient?.username,
        id: user?.patient?.patientId,
        age: user?.patient?.age,
        dob: user?.patient?.dob,
        gender: user?.patient?.gender,
        email: user?.patient?.email,
        address: user?.patient?.address,
        phone: user?.patient?.phone,
      });
    }
  }, [user]);

  const goBackHandler = () => {
    navigate(-1);
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
        <div className="relative z-10 w-full border-[3px] border-[#0077ff94] bg-[#ffffff88] rounded-md p-2 px-6">
          <div className="w-full h-20 flex justify-center items-center">
            <span>
              <img
                src={user.profilePicture || avatar}
                alt="profile Img"
                className="border-2 border-gray-100 w-[66px] h-[66px] object-cover rounded-full shadow-lg cursor-pointer"
              />
            </span>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <span className="text-lg font-alice font-bold">Full Name</span>
            <span className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm">
              {patient?.name}
            </span>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <span className="text-lg font-alice font-bold">Email</span>
            <span className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm">
              {patient?.email}
            </span>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <span className="text-lg font-alice font-bold">Age</span>
            <span className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm">
              {patient?.age}
            </span>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <span className="text-lg font-alice font-bold">Gender</span>
            <span className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm">
              {patient?.gender}
            </span>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <span className="text-lg font-alice font-bold">Patient_ID</span>
            <span className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm">
              {patient?.id}
            </span>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <span className="text-lg font-alice font-bold">DOB</span>
            <span className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm">
              {patient?.dob}
            </span>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <span className="text-lg font-alice font-bold">Phone</span>
            <span className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm">
              {patient?.phone}
            </span>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <span className="text-lg font-alice font-bold">Address</span>
            <span className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm overflow-hidden overflow-x-scroll">
              {patient?.address}
            </span>
          </div>
          <div className="w-full h-10 flex items-center justify-center py-1 mt-2">
            <Button onClick={goBackHandler}>Go Back</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;

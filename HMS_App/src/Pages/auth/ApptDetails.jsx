import { getApptDetails } from "@/helper/API/user";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import avatar from "../../assets/profile.png";
import { Button } from "@/components/ui/button";

const ApptDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { apptDetails } = useSelector((state) => state.user);
  const [appt, setAppt] = useState({
    name: "",
    id: "",
    age: "",
    dob: "",
    gender: "",
    email: "",
    address: "",
    phone: "",
    diagnosis: "",
    prescription: "",
    condition: "",
    status: "",
    docName: "",
  });

  useEffect(() => {
    const fetchPatientDetails = async () => {
      if (location?.state) {
        if (!apptDetails?._id) {
          await dispatch(
            getApptDetails({ appt_id: location?.state?.appt_id })
          ).unwrap();
        }
      }
    };
    fetchPatientDetails();
    // console.log(apptDetails);
  }, [dispatch, location, apptDetails]);

  useEffect(() => {
    if (apptDetails) {
      setAppt({
        ...appt,
        name: apptDetails?.username,
        id: apptDetails?.appointmentNo,
        age: apptDetails?.age,
        dob: apptDetails?.dob,
        gender: apptDetails?.gender,
        email: apptDetails?.email,
        address: apptDetails?.address,
        phone: apptDetails?.phone,
        docName: apptDetails?.doctor?.username,
        diagnosis: apptDetails?.diagnosis,
        prescription: apptDetails?.prescription,
        condition: apptDetails?.condition,
        status: apptDetails?.status,
      });
    }
  }, [apptDetails]);

  const goBackHandler = () => {
    navigate(-1);
  };

  const imageUrl =
    "https://plus.unsplash.com/premium_photo-1681843126728-04eab730febe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div className="w-full h-screen bg p-10 flex items-center justify-center">
      <ToastContainer />
      <div className="relative w-[60%] h-[80%] p-5 mt-16 shadow-lg shadow-black">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-[3px]"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        <div className="relative z-10 w-full h-full overflow-hidden overflow-y-auto border-[3px] border-[#0077ff94] bg-[#ffffff88] rounded-md p-2 px-6">
          <div className="w-full h-20 flex justify-center items-center">
            <span>
              <img
                src={appt.profilePicture || avatar}
                alt="profile Img"
                className="border-2 border-gray-100 w-[66px] h-[66px] object-cover rounded-full shadow-lg cursor-pointer"
              />
            </span>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <span className="text-lg font-alice font-bold">
              Patient&apos;s Name
            </span>
            <span className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm">
              {appt?.name}
            </span>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <span className="text-lg font-alice font-bold">Email</span>
            <span className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm">
              {appt?.email}
            </span>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <span className="text-lg font-alice font-bold">Age</span>
            <span className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm">
              {appt?.age}
            </span>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <span className="text-lg font-alice font-bold">Gender</span>
            <span className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm">
              {appt?.gender}
            </span>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <span className="text-lg font-alice font-bold">Appt_No.</span>
            <span className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm">
              {appt?.id}
            </span>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <span className="text-lg font-alice font-bold">Dob</span>
            <span className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm">
              {appt?.dob}
            </span>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <span className="text-lg font-alice font-bold">Phone</span>
            <span className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm">
              {appt?.phone}
            </span>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <span className="text-lg font-alice font-bold">Address</span>
            <span className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm overflow-hidden overflow-x-scroll">
              {appt?.address}
            </span>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <span className="text-lg font-alice font-bold">Diagnosis</span>
            <span className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm overflow-hidden overflow-x-scroll">
              {appt?.diagnosis}
            </span>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <span className="text-lg font-alice font-bold">Prescription</span>
            <span className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm overflow-hidden overflow-x-scroll">
              {appt?.prescription}
            </span>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <span className="text-lg font-alice font-bold">Condition</span>
            <span className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm overflow-hidden overflow-x-scroll">
              {appt?.condition}
            </span>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <span className="text-lg font-alice font-bold">Status</span>
            <span className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm overflow-hidden overflow-x-scroll">
              {appt?.status}
            </span>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <span className="text-lg font-alice font-bold">Treated BY</span>
            <span className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm overflow-hidden overflow-x-scroll">
              {`Dr. ${appt?.docName}`}
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

export default ApptDetails;

// import React from "react";
import { Button } from "@/components/ui/button";
import avatar from "../../assets/profile.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserDetails } from "@/helper/API/user";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (location?.state?.message) {
      toast.success(location.state.message);
    }
    if (!user.firstName) {
      dispatch(getUserDetails());
    }
  }, [user, location]);

  const updateHandler = () => {
    navigate("/user/profile/update");
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
            <span className="text-lg font-alice font-bold">First Name</span>
            <span className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm">
              {user?.firstName}
            </span>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <span className="text-lg font-alice font-bold">Middle Name</span>
            <span className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm">
              {user?.middleName}
            </span>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <span className="text-lg font-alice font-bold">Last Name</span>
            <span className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm">
              {user?.lastName}
            </span>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <span className="text-lg font-alice font-bold">Gender</span>
            <span className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm">
              {user?.gender}
            </span>
          </div>
          {user.usertype == "Admin" || user.usertype == "Doctor" ? (
            <div className="w-full h-10 flex items-center justify-between py-1">
              <span className="text-lg font-alice font-bold">Role</span>
              <span className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm">
                {user?.usertype === "Admin" ? user?.usertype : user?.role}
              </span>
            </div>
          ) : (
            <></>
          )}

          <div className="w-full h-10 flex items-center justify-between py-1">
            <span className="text-lg font-alice font-bold">Email</span>
            <span className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm">
              {user?.email}
            </span>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <span className="text-lg font-alice font-bold">Phone</span>
            <span className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm">
              {user?.phone}
            </span>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <span className="text-lg font-alice font-bold">Address</span>
            <span className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm overflow-hidden overflow-x-scroll">
              {user?.address}
            </span>
          </div>
          <div className="w-full h-10 flex items-center justify-center py-1 mt-2">
            <Button onClick={updateHandler}>Edit</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

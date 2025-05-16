// import React from 'react'
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { getDoctors, removeDoctor } from "@/helper/API/user";
import { doctorDeletion } from "@/store/reducers/UserReducer";
import { useLocation, useNavigate } from "react-router-dom";

const DoctorsRecord = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { doctors } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.user);
  const [doc, setDoc] = useState([]);
  useEffect(() => {
    const fetchDoctors = async () => {
      if (user.usertype == "Doctor" || user.usertype == "Patient") {
        navigate(-1);
      }
      if (location?.state?.message) {
        toast.success(location.state.message);
      }
      try {
        await dispatch(getDoctors()).unwrap();
      } catch (error) {
        console.error(error);
      }
    };
    fetchDoctors();
  }, [dispatch, location]);

  useEffect(() => {
    setDoc([...doctors]);
  }, [doctors]);

  const handleDeletion = async (id) => {
    try {
      const response = await dispatch(removeDoctor({ doctor_id: id }));
      await dispatch(doctorDeletion(id));
      if (response) {
        toast.success("Doctor deleted successfully...");
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
      <div className="relative w-[90%] h-[70%] p-5 mt-16 shadow-lg shadow-black">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-[3px]"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        <div className="relative w-full h-full overflow-hidden overflow-y-auto border-[3px] border-[#0077ff94] bg-[#ffffff88] p-4">
          <Table>
            <TableCaption>A list of Doctors in this hospital.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Doctor&apos;s Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doc?.map((d, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{d?.username}</TableCell>
                    <TableCell>{d?.email}</TableCell>
                    <TableCell>{d?.phone}</TableCell>
                    <TableCell>{d?.gender}</TableCell>
                    <TableCell className="">{d?.role}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        className="px-3 py-5"
                        onClick={() => handleDeletion(d._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DoctorsRecord;

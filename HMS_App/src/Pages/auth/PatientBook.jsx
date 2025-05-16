// import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { getPatientDetails, getPatientsRecord } from "@/helper/API/user";

const PatientBook = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { user, patients } = useSelector((state) => state.user);
  const [patientRecords, setPatientRecords] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      if (user.usertype == "Patient") {
        navigate(-1);
      }
      if (location?.state?.message) {
        toast.success(location.state.message);
      }
      try {
        await dispatch(getPatientsRecord()).unwrap();
      } catch (error) {
        console.error(error);
      }
    };
    fetchDoctors();
  }, [dispatch, location, user?.usertype]);

  useEffect(() => {
    setPatientRecords([...patients]);
  }, [patients]);

  const handleGetDetails = async (id) => {
    try {
      const response = await dispatch(
        getPatientDetails({ patient_id: id })
      ).unwrap();
      // console.log(response);
      if (response) {
        navigate("/user/patient/details", {
          state: {
            patient_id: id,
          },
        });
      }
    } catch (error) {
      toast.error(error.message);
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
            <TableCaption>A list of Patients in this hospital.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Patient&apos;s ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patientRecords?.map((pr, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell className="font-medium">
                      {pr?.patientId}
                    </TableCell>
                    <TableCell>{pr?.username}</TableCell>
                    <TableCell>{pr?.age}</TableCell>
                    <TableCell>{pr?.gender}</TableCell>
                    <TableCell>{pr?.email}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        className="px-3 py-5"
                        onClick={() => handleGetDetails(pr._id)}
                      >
                        Details
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

export default PatientBook;

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
import { deleteOutbreak, getOutbreaks } from "@/helper/API/user";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const LikelyOutbreak = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, outbreaks } = useSelector((state) => state.user);
  const [ob, setOb] = useState([]);
  useEffect(() => {
    const fetchOutbreaks = async () => {
      if (location?.state?.message) {
        toast.success(location.state.message);
      }
      try {
        await dispatch(getOutbreaks()).unwrap();
      } catch (error) {
        console.error(error);
      }
    };
    fetchOutbreaks();
  }, [dispatch, location]);

  useEffect(() => {
    setOb([...outbreaks]);
  }, [outbreaks]);

  const handleEdit = (id) => {
    // console.log(id);
    if (id) {
      navigate("/user/edit/outbreak", {
        state: {
          id,
        },
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await dispatch(deleteOutbreak({ outbreak_id: id }));

      if (response) {
        navigate("/user/likely/outbreaks", {
          state: {
            message: "Outbreak deleted successfully...",
          },
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const imageUrl =
    "https://plus.unsplash.com/premium_photo-1681843126728-04eab730febe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div className="w-full h-screen bg p-10 flex items-center justify-center">
      <ToastContainer />
      <div className="relative h-[70%] p-5 mt-16 shadow-lg shadow-black">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-[3px]"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        <div className="relative w-full h-full overflow-hidden overflow-y-auto border-[3px] border-[#0077ff94] bg-[#ffffff88] p-4">
          <Table>
            <TableCaption>A list of recent outbreaks in the city.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="">Outbreak</TableHead>
                <TableHead>Comments</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="">Recorded</TableHead>
                <TableHead className="">Measures</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ob?.map((o, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{o?.obname}</TableCell>
                    <TableCell>{o?.obcomments}</TableCell>
                    <TableCell>{o?.oblocation}</TableCell>
                    <TableCell className="">
                      {o?.updatedAt.split("T")[0]}
                    </TableCell>
                    <TableCell className="">{o?.obmeasures}</TableCell>
                    <TableCell className="text-right flex gap-4">
                      {user.usertype === "Admin" ? (
                        <>
                          <Button
                            className="px-3 py-5"
                            onClick={() => handleEdit(o?._id)}
                          >
                            Edit
                          </Button>
                          <Button
                            className="px-3 py-5"
                            onClick={() => handleDelete(o?._id)}
                          >
                            Delete
                          </Button>
                        </>
                      ) : (
                        <Button
                          className="px-3 py-5"
                          onClick={() => handleEdit(o?._id)}
                        >
                          Edit
                        </Button>
                      )}
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

export default LikelyOutbreak;

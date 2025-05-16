import { Button } from "@/components/ui/button";
import { addOutbreak, updateOutbreak } from "@/helper/API/user";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const EditOutbreak = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, outbreaks } = useSelector((state) => state.user);
  const [outbreak, setOutbreak] = useState({
    obid: "",
    obname: "",
    obcomments: "",
    oblocation: "",
    obmeasures: "",
  });

  useEffect(() => {
    if (user.usertype != "Admin" && user.usertype != "Doctor") {
      navigate(-1);
    }
    const { id } = location.state;
    if (id) {
      const ob = outbreaks.find((ob) => ob._id == id);
      setOutbreak({
        obid: id || "",
        obname: ob?.obname || "",
        obcomments: ob?.obcomments || "",
        oblocation: ob?.oblocation || "",
        obmeasures: ob?.obmeasures || "",
      });
    } else {
      navigate(-1);
    }
  }, [location]);

  const isFormValid = () => {
    const { obname, obcomments, oblocation, obmeasures } = outbreak;

    if (
      !obname?.trim() ||
      !obcomments?.trim() ||
      !oblocation?.trim() ||
      !obmeasures?.trim()
    ) {
      toast.error("Enter all the fields...");
      return false;
    }

    return true;
  };

  const inputChangeHandler = (e) => {
    setOutbreak({ ...outbreak, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (isFormValid()) {
        const response = await dispatch(updateOutbreak(outbreak)).unwrap();

        if (response) {
          navigate("/user/likely/outbreaks", {
            state: {
              message: "Outbreak updated successfully...",
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
          <div className="w-full h-10 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">Outbreak</label>
            <input
              type="text"
              placeholder="Enter outbreak name here..."
              name="obname"
              value={outbreak?.obname}
              onChange={inputChangeHandler}
              className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"
            />
          </div>
          <div className="w-full h-20 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">Comments</label>
            <textarea
              name="obcomments"
              placeholder="Enter outbreak comments here..."
              value={outbreak?.obcomments}
              onChange={inputChangeHandler}
              className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"
            ></textarea>
          </div>
          <div className="w-full h-10 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">Location</label>
            <input
              type="text"
              placeholder="Enter outbreak location here..."
              name="oblocation"
              value={outbreak?.oblocation}
              onChange={inputChangeHandler}
              className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"
            />
          </div>
          <div className="w-full h-20 flex items-center justify-between py-1">
            <label className="text-lg font-alice font-bold">Measures</label>
            <textarea
              name="obmeasures"
              placeholder="Enter outbreak measures here..."
              value={outbreak?.obmeasures}
              onChange={inputChangeHandler}
              className="border-[3px] border-slate-400 h-full w-[70%] bg-[#d0cdcdb6] rounded-sm"
            ></textarea>
          </div>

          <div className="w-full h-10 flex items-center justify-center py-1 mt-2">
            <Button>Edit Outbreak</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOutbreak;

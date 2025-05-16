import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  loggedOutUserOtpVerification,
  mailerAPI,
  registeredUserOtpVerificationAPI,
} from "@/helper/API/user";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
// import { toast } from "@/components/hooks/use-toast";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const OTP_Verification = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const imageURL =
    "https://img.freepik.com/premium-photo/hospital-hallway-unfocused-background_786878-6945.jpg?size=626&ext=jpg&ga=GA1.1.1289161518.1725302723&semt=ais_hybrid";

  useEffect(() => {
    // Check if a message was passed via navigate
    if (location.state?.message) {
      toast.success(location.state.message);
    }
  }, [location]);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (token) {
        const decode = await jwtDecode(token);
        toast.success(`You'hv submitted ${data.pin}`);

        if (decode.purpose == "User Registration") {
          const response = await dispatch(
            registeredUserOtpVerificationAPI({
              otp: data.pin,
            })
          ).unwrap();

          if (response) {
            const today = new Date();
            const day = today.getDate();
            const month = today.getMonth() + 1; // Months are zero-indexed (January is 0)
            const year = today.getFullYear();
            const date = day + "." + month + "." + year;
            dispatch(
              mailerAPI({
                userName: decode.username,
                userEmail: decode.userEmail,
                text: `Thank you for registering with HMS_MERCY Portal! We’re excited to have you onboard. Your account has been successfully verified, and you now have full access to all our features and services.Account Details
  Username: ${decode.userEmail}
  Registration Date: ${date}`,
                subject:
                  "Welcome to HMS_MERCY! Your Account is Successfully Verified",
              })
            ).unwrap();
            localStorage.removeItem("token");
            navigate("/login", {
              state: {
                message: "Successfully registration has been done...",
              },
            });
          }
        } else if (decode.purpose == "Password Change") {
          const response = await dispatch(
            loggedOutUserOtpVerification({ otp: data.pin })
          ).unwrap();

          if (response) {
            navigate("/user/password/change", {
              state: {
                message: "OTP Verified, now enter passwords...",
              },
            });
          }
        }
      } else {
        toast.error("Please register first...");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className="relative w-full h-[88%] flex flex-col items-center justify-center">
      <ToastContainer />
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm"
        style={{ backgroundImage: `url(${imageURL})` }}
      ></div>
      <div className="otp-input-box shadow-lg shadow-[#005CC8] border-[#005CC8] rounded-md relative z-10 w-1/4 h-1/2 border-4 flex justify-center items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="text-center w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-2xl">One-Time Password</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup className="mt-10">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Please enter the one-time password sent to your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default OTP_Verification;

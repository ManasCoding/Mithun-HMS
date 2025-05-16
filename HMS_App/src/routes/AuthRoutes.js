import AddDoctors from "@/Pages/auth/AddDoctors";
import AddOutbreak from "@/Pages/auth/AddOutbreak";
import AddPatients from "@/Pages/auth/AddPatients";
import Appointment from "@/Pages/auth/Appointment";
import ApptDetails from "@/Pages/auth/ApptDetails";
import BookAppt from "@/Pages/auth/BookAppt";
import ChangePassword from "@/Pages/auth/ChangePassword";
import Dashboard from "@/Pages/auth/Dashboard";
import DoctorsRecord from "@/Pages/auth/DoctorsRecord";
import EditOutbreak from "@/Pages/auth/EditOutbreak";
import LikelyOutbreak from "@/Pages/auth/LikelyOutbreak";
import OTP_Verification from "@/Pages/auth/OTP_Verification";
import PasswordChange from "@/Pages/auth/PasswordChange";
import PatApptDetails from "@/Pages/auth/PatApptDetails";
import PatientBook from "@/Pages/auth/PatientBook";
import PatientDetails from "@/Pages/auth/PatientDetails";
import Profile from "@/Pages/auth/Profile";
import UpdateProfile from "@/Pages/auth/UpdateProfile";

export const AuthRoutes = [
  {
    path: "/register/otp-verify",
    element: OTP_Verification,
  },
  {
    path: "/user/dashboard",
    element: Dashboard,
  },
  {
    path: "/user/profile",
    element: Profile,
  },
  {
    path: "/user/profile/update",
    element: UpdateProfile,
  },
  {
    path: "/user/add/patient",
    element: AddPatients,
  },

  {
    path: "/user/patients/record",
    element: PatientBook,
  },
  {
    path: "/user/patient/details",
    element: PatientDetails,
  },
  {
    path: "/user/add/doctor",
    element: AddDoctors,
  },
  {
    path: "/user/doctors/record",
    element: DoctorsRecord,
  },
  {
    path: "/user/appointments",
    element: Appointment,
  },
  {
    path: "/user/appointment/details",
    element: ApptDetails,
  },
  {
    path: "/user/add/outbreak",
    element: AddOutbreak,
  },
  {
    path: "/user/likely/outbreaks",
    element: LikelyOutbreak,
  },
  {
    path: "/user/edit/outbreak",
    element: EditOutbreak,
  },
  {
    path: "/user/password/update",
    element: PasswordChange,
  },
  {
    path: "/user/password/change",
    element: ChangePassword,
  },
  {
    path: "/user/appt/details",
    element: PatApptDetails,
  },
  {
    path: "/user/book/appt",
    element: BookAppt,
  },
];

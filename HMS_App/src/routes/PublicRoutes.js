import AboutUs from "@/Pages/public/AboutUs";
import Contact from "@/Pages/public/Contact";
import Home from "@/Pages/public/Home";
import Login_Form from "@/Pages/public/Login_Form";
import Register_Form from "@/Pages/public/Register_Form";
import username from "@/Pages/public/Username";

export const PublicRoutes = [
  {
    path: "/login",
    element: Login_Form,
  },
  {
    path: "/register",
    element: Register_Form,
  },
  {
    path: "/",
    element: Home,
  },
  {
    path: "/about-us",
    element: AboutUs,
  },
  {
    path: "/contact-us",
    element: Contact,
  },
  {
    path: "/search/username",
    element: username,
  },
];

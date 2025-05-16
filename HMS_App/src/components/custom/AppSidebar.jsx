import avatar from "../../assets/profile.png";
import {
  SquareUser,
  BookUser,
  UserRoundPlus,
  AlarmClockCheck,
  ShieldAlert,
  ShieldQuestion,
  LogOut,
  Wallet,
  CalendarDays,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserDetails } from "@/helper/API/user";

// Menu items.
const adminItems = [
  {
    title: "Dashboard",
    url: "/user/dashboard",
    icon: Wallet,
  },
  {
    title: "Profile",
    url: "/user/profile",
    icon: SquareUser,
  },
  {
    title: "Patient's Record",
    url: "/user/patients/record",
    icon: BookUser,
  },
  {
    title: "Add Doctor",
    url: "/user/add/doctor",
    icon: UserRoundPlus,
  },
  {
    title: "Doctor's Record",
    url: "/user/doctors/record",
    icon: BookUser,
  },
  {
    title: "View Appointments",
    url: "/user/appointments",
    icon: CalendarDays,
  },
  {
    title: "Add Outbreak",
    url: "/user/add/outbreak",
    icon: ShieldAlert,
  },
  {
    title: "Likely Outbreaks",
    url: "/user/likely/outbreaks",
    icon: ShieldQuestion,
  },
  {
    title: "Logout",
    url: "/",
    icon: LogOut,
  },
];

const doctorItems = [
  {
    title: "Dashboard",
    url: "/user/dashboard",
    icon: Wallet,
  },
  {
    title: "Profile",
    url: "/user/profile",
    icon: SquareUser,
  },
  {
    title: "Book Appointment",
    url: "/user/add/patient",
    icon: UserRoundPlus,
  },
  {
    title: "Patient's Book",
    url: "/user/patients/record",
    icon: BookUser,
  },
  {
    title: "View Appointments",
    url: "/user/appointments",
    icon: CalendarDays,
  },
  {
    title: "Likely Outbreaks",
    url: "/user/likely/outbreaks",
    icon: ShieldQuestion,
  },
  {
    title: "Logout",
    url: "/",
    icon: LogOut,
  },
];

const patientItems = [
  {
    title: "Dashboard",
    url: "/user/dashboard",
    icon: Wallet,
  },
  {
    title: "Profile",
    url: "/user/profile",
    icon: SquareUser,
  },
  {
    title: "ApptDetails",
    url: "/user/appointments",
    icon: SquareUser,
  },
  {
    title: "Book Appointment",
    url: "/user/book/appt",
    icon: SquareUser,
  },
  {
    title: "Logout",
    url: "/",
    icon: LogOut,
  },
];

export function AppSidebar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  // const history = useHistory();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (!user?.firstName) {
          await dispatch(getUserDetails()).unwrap();
        }
      } catch (error) {
        console.log(`Failed to fetch user details: ${error}`);
        localStorage.removeItem("token");
        navigate("/");
      }
    };
    fetchUserDetails();
  }, [user, dispatch, history]);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="py-10">
            <div className="flex justify-center items-center">
              <span>
                <img
                  src={user.profilePicture || avatar}
                  alt="profile Img"
                  className="border-2 border-gray-100 w-[50px] h-[50px] object-cover rounded-full shadow-lg cursor-pointer"
                />
              </span>
              <span className="ml-2">
                <h2 className="font-semibold text-lg text-black">
                  {user?.usertype === "Doctor"
                    ? `Dr. ${user?.firstName || ""} `
                    : user?.firstName || ""}
                </h2>
                <h2 className="text-sm font-medium">
                  {user?.usertype === "Doctor" ? user?.role : user?.usertype}
                </h2>
              </span>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="relative h-full">
              {user?.usertype == "Admin"
                ? adminItems.map((item, index) => (
                    <SidebarMenuItem
                      key={item.title}
                      className="last:absolute last:bottom-0 last:w-full last:mb-5"
                    >
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        isActive={
                          item.url == location.pathname ? "true" : "false"
                        }
                        className="hover:font-medium hover:text-[#0077ff94]"
                        onClick={() => {
                          if (index === adminItems.length - 1)
                            localStorage.removeItem("token");
                        }}
                      >
                        <NavLink to={item.url}>
                          <span className="text-xl">
                            <item.icon />
                          </span>
                          <span className="text-base">{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                : user?.usertype == "Doctor"
                ? doctorItems.map((item, index) => (
                    <SidebarMenuItem
                      key={item.title}
                      className="last:absolute last:bottom-0 last:w-full last:mb-5"
                    >
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        isActive={
                          item.url == location.pathname ? "true" : "false"
                        }
                        className="hover:font-medium hover:text-[#0077ff94]"
                        onClick={() => {
                          if (index === doctorItems.length - 1)
                            localStorage.removeItem("token");
                        }}
                      >
                        <NavLink to={item.url}>
                          <span className="text-xl">
                            <item.icon />
                          </span>
                          <span className="text-base">{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                : patientItems.map((item, index) => (
                    <SidebarMenuItem
                      key={item.title}
                      className="last:absolute last:bottom-0 last:w-full last:mb-5"
                    >
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        isActive={
                          item.url == location.pathname ? "true" : "false"
                        }
                        className="hover:font-medium hover:text-[#0077ff94]"
                        onClick={() => {
                          if (index === doctorItems.length - 1)
                            localStorage.removeItem("token");
                        }}
                      >
                        <NavLink to={item.url}>
                          <span className="text-xl">
                            <item.icon />
                          </span>
                          <span className="text-base">{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

import {
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/20/solid";
import {
  Users,
  CalendarCheck,
  MapPin,
  Percent,
  FileText,
  ClipboardCheck,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import {
  Sidebar as SidebarComponent,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarBody,
  SidebarSection,
  SidebarSpacer,
  SidebarFooter,
} from "../../shared/components/Sidebar";
import LHGLogo from "../../assets/logo.png";
import { useAuth } from "../../Providers/AuthProvider";
import { Button } from "../../shared/components/button";
// import { logout } from "../../api/authAPI";

export function AsideBar() {
  const location = useLocation();
  const pathname = location.pathname;
  const { user } = useAuth();
  const navigate = useNavigate();
  const signOut = async () => {
    // await logout();
    navigate("/login");
  };

  const adminNavItems = [
    { name: "Users", path: "/users", icon: Users },
    { name: "Events", path: "/events", icon: CalendarCheck },
    { name: "Venues", path: "/venues", icon: MapPin },
    { name: "Bookings", path: "/bookings", icon: ClipboardCheck },
    { name: "Deals", path: "/deals", icon: Percent },
    { name: "Policies", path: "/policies", icon: FileText },
  ];
  return (
    <SidebarComponent>
      <SidebarHeader>
        <SidebarItem>
          <SidebarLabel className="object-contain rounded-lg">
            <img src={LHGLogo} alt="Scupid" className="w-1/2 mx-auto " />
          </SidebarLabel>
        </SidebarItem>
      </SidebarHeader>

      <SidebarBody>
        <SidebarSection>
          {adminNavItems.map(({ name, path, icon: Icon }) => (
            <SidebarItem key={name} to={path} current={pathname === path}>
              <Icon className="size-4" />
              <SidebarLabel>{name}</SidebarLabel>
            </SidebarItem>
          ))}
        </SidebarSection>

        <SidebarSpacer />
      </SidebarBody>

      <SidebarFooter className="max-lg:hidden">
        <Button
          onClick={signOut}
          className="flex justify-between w-full font-normal truncate bg-white text-xs/5 text-zinc-500 dark:text-zinc-400"
        >
          <span className="block font-medium truncate text-sm/5 text-zinc-950 ">
            {user?.email}
          </span>
          <ArrowRightStartOnRectangleIcon fill="black" />
        </Button>
      </SidebarFooter>
    </SidebarComponent>
  );
}

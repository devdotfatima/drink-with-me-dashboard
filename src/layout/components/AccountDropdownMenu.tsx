import {
  ArrowRightStartOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";

import {
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "../../shared/components/Dropdown";
import { useNavigate } from "react-router";
// import { logout } from "../../api/authAPI";

type AccountDropdownMenuPropsT = { anchor: "top start" | "bottom end" };

const AccountDropdownMenu = ({ anchor }: AccountDropdownMenuPropsT) => {
  const navigate = useNavigate();
  const logOut = async () => {
    // await logout();
    navigate("/login");
  };
  return (
    <DropdownMenu
      className="min-w-64 text-white bg-primary-600"
      anchor={anchor}
    >
      <DropdownItem href="#">
        <UserCircleIcon fill="white" />
        <DropdownLabel>My account</DropdownLabel>
      </DropdownItem>

      <DropdownDivider className="text-white bg-white" />
      <DropdownItem onClick={logOut}>
        <ArrowRightStartOnRectangleIcon fill="white" />
        <DropdownLabel className="text-white">Sign out</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  );
};

export default AccountDropdownMenu;

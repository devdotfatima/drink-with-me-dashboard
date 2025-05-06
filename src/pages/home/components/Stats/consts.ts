import {
  CalendarIcon,
  UsersIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

export const stats = [
  {
    id: 1,
    name: "Total Locations",
    stat: "71,897",
    icon: MapPinIcon,
    change: "122",
    changeType: "increase",
  },
  {
    id: 2,
    name: "Total Customers",
    stat: "58.16%",
    icon: UsersIcon,
    change: "5.4%",
    changeType: "increase",
  },
  {
    id: 3,
    name: "Total Bookings",
    stat: "24.57%",
    icon: CalendarIcon,
    change: "3.2%",
    changeType: "decrease",
  },
];

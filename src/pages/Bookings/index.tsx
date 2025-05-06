import {  MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";
import { Menu } from "@headlessui/react";

const dummyBookings = [
  {
    id: 1,
    user: {
      name: "Anna Svensson",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg"
    },
    bookingType: "Wine testing",
    privacy: "Private",
    startDate: "2025-06-15",
    endDate: "2025-06-15",
    members: 12,
    venue: "The Grape House",
    location: "Stockholm, Sweden"
  },
  {
    id: 2,
    user: {
      name: "Erik Johansson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    bookingType: "Art",
    privacy: "Public",
    startDate: "2025-07-04",
    endDate: "2025-07-05",
    members: 35,
    venue: "Seaside Pavilion",
    location: "Gothenburg, Sweden"
  },
  // add more bookings...
];

const Bookings = () => {
  return (
    <div className="p-5">
      <h1 className="mb-4 text-2xl font-semibold">Bookings</h1>
      <div className="flex w-full justify-end mb-10">
       
      </div>
      <div>
        <table className="w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Booked By</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Venue</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Location</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Privacy</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Dates</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Members</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {dummyBookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-4 py-3 text-sm text-gray-700 flex items-center gap-3">
                  <img src={booking.user.avatar} alt={booking.user.name} className="w-8 h-8 rounded-full" />
                  {booking.user.name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">{booking.venue}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{booking.location}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{booking.bookingType}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{booking.privacy}</td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {booking.startDate} – {booking.endDate}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">{booking.members}</td>
                <td className="relative py-4 text-sm text-gray-500">
                  <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="flex items-center p-1 rounded-full hover:bg-gray-100 focus:outline-none">
                      <MoreVertical className="w-5 h-5 text-gray-500" />
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 z-50 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={`/bookings/${booking.id}`}
                              className={`${active ? "bg-gray-100" : ""} group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-700`}
                            >
                              View
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${active ? "bg-gray-100" : ""} group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-700`}
                            >
                              Delete
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
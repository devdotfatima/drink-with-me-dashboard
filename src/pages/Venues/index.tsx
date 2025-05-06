import {  MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";
import { Menu } from "@headlessui/react";

const dummyVenues = [
  {
    id: 1,
    name: "The Grape House",
    location: "Stockholm, Sweden",
    images: [
      "https://www.cottagesandbungalowsmag.com/wp-content/uploads/2012/09/C_Barn200.jpg",
      "https://example.com/images/grape-interior.jpg"
    ],
    popularDrinks: ["Pinot Noir", "Chardonnay", "Rosé Cuvée"],
    social: {
      instagram: "https://instagram.com/grapehouse",
      facebook: "https://facebook.com/grapehouse",
      website: "https://grapehouse.se"
    },
    timings: {
      days: ["Mon", "Tue", "Wed", "Fri", "Sat"],
      hours: "17:00 - 23:00"
    },
    likedBy: [
      { id: 101, name: "Alice Johnson" },
      { id: 102, name: "Tom Watts" },
      { id: 103, name: "Nina Forsberg" }
    ]
  },
  // More dummy venues...
];

const Venues = () => {
  return (
    <div className="p-5">
      <h1 className="mb-4 text-2xl font-semibold">Venues</h1>
      <div className="flex w-full justify-end">
        <Link
          to="/venues/add"
          className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700"
        >
          + Add Venue
        </Link>
      </div>
      <div className="">
        <table className="w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-left text-gray-900">Name</th>
              <th className="px-4 py-3 text-sm font-semibold text-left text-gray-900">Location</th>
              <th className="px-4 py-3 text-sm font-semibold text-left text-gray-900">Likes</th>
              <th className="px-4 py-3 text-sm font-semibold text-left text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {dummyVenues.map((venue) => (
              <tr key={venue.id}>

                <td className="px-4 py-3 text-sm text-gray-700 flex items-center gap-1.5">
                  <img
                    src={venue.images[0]}
                    alt={venue.name}
                    className="w-12 h-12 border-2 border-primary object-cover  rounded-full"
                  />{venue.name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">{venue.location}</td>

                <td className="px-4 py-3 text-sm text-gray-700">{venue.likedBy.length}</td>

                <td className="relative  border-gray-200  py-4 text-sm  text-gray-500">
                  <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="flex items-center p-1 rounded-full hover:bg-gray-100 focus:outline-none">
                      <MoreVertical className="w-5 h-5 text-gray-500" />
                    </Menu.Button>

                    {/* Dropdown Menu */}
                    <Menu.Items className="absolute right-0 z-50 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={`/venues/${venue.id}`}
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

export default Venues;
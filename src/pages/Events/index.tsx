import {  MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";
import { Menu } from "@headlessui/react";

const dummyEvents = [
  {
    id: 1,
    title: "Summer Wine Tasting Gala",
    description: "Experience over 50 varieties of local and international wines.",
    location: "Stockholm, Sweden",
    venue: "The Grape House",
    type: "Wine Tasting",
    date: "2025-06-15",
    time: "18:00",
    image: "https://example.com/images/wine-gala.jpg"
  },
  {
    id: 2,
    title: "Sunset Jazz & Rosé",
    description: "Enjoy live jazz and curated rosé pairings under the stars.",
    location: "Gothenburg, Sweden",
    venue: "Seaside Pavilion",
    type: "Music & Wine",
    date: "2025-07-04",
    time: "20:00",
    image: "https://example.com/images/jazz-rose.jpg"
  },
  {
    id: 3,
    title: "Art & Aromas",
    description: "A sensory journey pairing art exhibits with bold red wines.",
    location: "Uppsala, Sweden",
    venue: "Artelier Gallery",
    type: "Art Event",
    date: "2025-08-10",
    time: "16:00",
    image: "https://example.com/images/art-aromas.jpg"
  },
  {
    id: 4,
    title: "Nordic Harvest Pairing",
    description: "Taste the essence of fall with locally-sourced dishes and wine.",
    location: "Malmö, Sweden",
    venue: "Harvest Hall",
    type: "Food & Wine",
    date: "2025-09-22",
    time: "19:30",
    image: "https://example.com/images/harvest-pairing.jpg"
  }
];

const Events = () => {
  return (
    <div className="p-5">
      <h1 className="mb-4 text-2xl font-semibold">Events</h1>
      <div className="flex w-full justify-end mb-10">
        <Link
          to="/events/add"
          className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700"
        >
          + Add Events
        </Link>
      </div>
      <div>
        <table className="w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-3 text-sm font-semibold text-left text-gray-900">Title</th>
              <th className="px-4 py-3 text-sm font-semibold text-left text-gray-900">Venue</th>
              <th className="px-4 py-3 text-sm font-semibold text-left text-gray-900">Location</th>
              <th className="px-4 py-3 text-sm font-semibold text-left text-gray-900">Type</th>
              <th className="px-4 py-3 text-sm font-semibold text-left text-gray-900">Date</th>
              <th className="px-4 py-3 text-sm font-semibold text-left text-gray-900">Time</th>
              <th className="px-4 py-3 text-sm font-semibold text-left text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {dummyEvents.map((event) => (
              <tr key={event.id}>
                <td className="px-4 py-3 text-sm text-gray-700">{event.title}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{event.venue}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{event.location}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{event.type}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{event.date}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{event.time}</td>
                
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
                              to={`/events/${event.id}`}
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

export default Events;
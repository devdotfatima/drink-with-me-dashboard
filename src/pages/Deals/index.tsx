import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";
import { Menu } from "@headlessui/react";

const dummyDeals = [
  {
    id: 1,
    title: "Spring Wine Offer",
    type: "Percentage",
    value: 20,
    status: "Active",
    startDate: "2025-04-01",
    endDate: "2025-05-15",
  },
  {
    id: 2,
    title: "VIP Membership Discount",
    type: "Flat",
    value: 50,
    status: "Expired",
    startDate: "2025-02-01",
    endDate: "2025-03-01",
  },
  {
    id: 3,
    title: "Private Tasting Launch",
    type: "Percentage",
    value: 15,
    status: "Upcoming",
    startDate: "2025-06-01",
    endDate: "2025-07-01",
  },
];

const statusColors = {
  Active: "bg-green-100 text-green-700",
  Expired: "bg-red-100 text-red-700",
  Upcoming: "bg-yellow-100 text-yellow-700",
};

const Deals = () => {
  const [deals] = useState(dummyDeals);
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredDeals =
    filterStatus === "All"
      ? deals
      : deals.filter((deal) => deal.status === filterStatus);

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Deals Management</h1>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-xl hover:bg-primary-700 transition">
          + Add Deal
        </button>
      </div>

      {/* Filters */}
      <div className="mb-4 flex items-center gap-4">
        <label className="text-gray-700 font-medium">Filter by Status:</label>
        <select
          className="border rounded-xl px-3 py-2 text-sm"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Expired">Expired</option>
          <option value="Upcoming">Upcoming</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-y-auto">
        <table className="w-full divide-y   divide-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Title</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Value</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Start Date</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">End Date</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredDeals.length > 0 ? (
              filteredDeals.map((deal) => (
                <tr key={deal.id} className="border-t hover:bg-gray-50">
                   <td className="px-4 py-3 text-sm text-gray-700">{deal.title}</td>
                   <td className="px-4 py-3 text-sm text-gray-700">{deal.type}</td>
                   <td className="px-4 py-3 text-sm text-gray-700">
                    {deal.type === "Percentage"
                      ? `${deal.value}%`
                      : `$${deal.value}`}
                  </td>
                   <td className="px-4 py-3 text-sm text-gray-700">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[deal.status as keyof typeof statusColors]
                        }`}
                    >
                      {deal.status}
                    </span>
                  </td>
                   <td className="px-4 py-3 text-sm text-gray-700">
                    {new Date(deal.startDate).toLocaleDateString()}
                  </td>
                   <td className="px-4 py-3 text-sm text-gray-700">
                    {new Date(deal.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 space-x-3">
                       <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="flex items-center p-1 rounded-full hover:bg-gray-100 focus:outline-none">
                      <MoreVertical className="w-5 h-5 text-gray-500" />
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 z-50 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={`/bookings/${deal.id}`}
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
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center text-gray-500 py-6">
                  No deals found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Deals;
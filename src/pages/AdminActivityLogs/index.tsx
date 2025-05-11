import { useState } from "react";
import { Button } from "../../shared/components/button";
import { MoreVertical } from "lucide-react";
import { Menu } from "@headlessui/react";
import Modal from "../../shared/components/Modal";
import { classNames } from "../../shared/lib/utils";

// Mock admin activity logs
const mockActivityLogs = [
  {
    id: 1,
    admin: "Alice Johnson",
    action: "Deleted user account",
    target: "User: John Doe",
    timestamp: "2025-05-09 14:23",
  },
  {
    id: 2,
    admin: "Bob Brown",
    action: "Updated booking status",
    target: "Booking #12345",
    timestamp: "2025-05-09 13:10",
  },
  {
    id: 3,
    admin: "Jane Smith",
    action: "Created announcement",
    target: "Title: New Schedule",
    timestamp: "2025-05-08 18:45",
  },
];

export function AdminActivityLogs() {
  const [logs] = useState(mockActivityLogs);
  const [selectedLog, setSelectedLog] = useState<typeof mockActivityLogs[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAction = (log: typeof mockActivityLogs[0]) => {
    setSelectedLog(log);
    setIsModalOpen(true);
  };

  return (
    <div className="p-5">
      <h1 className="mb-4 text-2xl font-semibold">Admin Activity Logs</h1>
      <div className="flow-root border-0">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div className="relative min-w-full py-2 align-middle">
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur sm:pl-6 lg:pl-8">Admin</th>
                  <th className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur">Action</th>
                  <th className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur">Target</th>
                  <th className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur">Timestamp</th>
                  <th className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pr-4 text-sm font-semibold text-right text-gray-900 backdrop-blur sm:pr-6 lg:pr-8">Actions</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, index) => (
                  <tr key={log.id}>
                    <td className={classNames(
                      index !== logs.length - 1 ? "border-b border-gray-200" : "",
                      "whitespace-nowrap px-3 py-4 text-sm text-gray-700"
                    )}>{log.admin}</td>
                    <td className={classNames(
                      index !== logs.length - 1 ? "border-b border-gray-200" : "",
                      "whitespace-nowrap px-3 py-4 text-sm text-gray-700"
                    )}>{log.action}</td>
                    <td className={classNames(
                      index !== logs.length - 1 ? "border-b border-gray-200" : "",
                      "whitespace-nowrap px-3 py-4 text-sm text-gray-700"
                    )}>{log.target}</td>
                    <td className={classNames(
                      index !== logs.length - 1 ? "border-b border-gray-200" : "",
                      "whitespace-nowrap px-3 py-4 text-sm text-gray-700"
                    )}>{log.timestamp}</td>
                    <td className="relative border-b border-gray-200 px-3 py-4 text-sm text-right text-gray-500">
                      <Menu as="div" className="inline-block text-left">
                        <Menu.Button className="flex items-center p-1 rounded-full hover:bg-gray-100">
                          <MoreVertical className="w-5 h-5 text-gray-500" />
                        </Menu.Button>
                        <Menu.Items className="absolute right-0 z-50 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="px-1 py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => handleAction(log)}
                                  className={`${active ? "bg-gray-100" : ""
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-700`}
                                >
                                  View Details
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => console.log("Delete log", log)}
                                  className={`${active ? "bg-gray-100" : ""
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm text-red-600`}
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
      </div>

      {isModalOpen && selectedLog && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Activity Details">
          <div className="space-y-4 text-sm text-gray-700">
            <p><strong>Admin:</strong> {selectedLog.admin}</p>
            <p><strong>Action:</strong> {selectedLog.action}</p>
            <p><strong>Target:</strong> {selectedLog.target}</p>
            <p><strong>Timestamp:</strong> {selectedLog.timestamp}</p>
            <div className="flex justify-end pt-4">
              <Button onClick={() => setIsModalOpen(false)} className="bg-black text-white">Close</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
import  { useState } from "react";
import { Button } from "../../shared/components/button";  
import { MoreVertical } from "lucide-react"; 
import { Menu } from "@headlessui/react";
import { useForm } from "react-hook-form";
import Modal from "../../shared/components/Modal"; 
import { classNames } from "../../shared/lib/utils";
import { Link } from "react-router";

// Mock data for users
const mockUsers = [
  { id: 0, name: "John Doe", email: "john@example.com", gender: "Male" },
  { id: 1, name: "Jane Smith", email: "jane@example.com",  gender: "Female" },
  { id: 2, name: "Alice Johnson", email: "alice@example.com",  gender: "Female" },
  { id: 3, name: "Bob Brown", email: "bob@example.com",  gender: "Male" },
];

export function Users() {
  const [users,] = useState(mockUsers);  // Current list of users
  const [selectedUser, setSelectedUser] = useState<null | {
    id: number;
    name: string;
    email: string;
    gender: string;
  }>(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); // Whether the modal is open
  const [actionType, setActionType] = useState<"ban" | "verify" | "edit" | null>(null); 
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");


  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleAction = (action: "ban" | "verify" | "edit" | null, user: {
    id: number;
    name: string;
    email: string;
    gender: string;
  }) => {
    setSelectedUser(user);
    setActionType(action);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    // Perform save action based on actionType (verify, ban, edit)
    console.log("Saved data");
    setIsModalOpen(false);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGender = genderFilter === "All" || user.gender === genderFilter;

    return matchesSearch && matchesGender;
  });

  return (
    <div className="p-5">
      <h1 className="mb-4 text-2xl font-semibold">User Management</h1>
      <div className="flow-root border-0 ">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div className="relative min-w-full py-2 px-8 align-middle ">
            <div className="flex flex-wrap items-center gap-4 mb-4 ">
              <input
                type="text"
                placeholder="Search by name or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-600 flex-1"
              />

              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-600"
              >
                <option value="All">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <table className="w-full max-w-full  border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">Name</th>
                  <th scope="col"
                    className="sticky top-0 z-10  border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter table-cell">Email</th>

                  <th scope="col"
                    className="sticky top-0 z-10  border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter table-cell">Gender</th>
                  
                 
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8 font-semibold text-sm"
                  >Actions
                    <span className="sr-only">Actions</span>
                  </th>

                  

                 
                  
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} >
                    <td className={classNames(
                      user.id !== mockUsers.length - 1
                        ? "border-b border-gray-200"
                        : "",
                      " whitespace-nowrap max-w-sm truncate px-3 py-4 text-sm text-gray-500 table-cell"
                    )}>
                      {user.name}</td>
                    <td className={classNames(
                      user.id !== mockUsers.length - 1
                        ? "border-b border-gray-200"
                        : "",
                      " whitespace-nowrap max-w-sm truncate px-3 py-4 text-sm text-gray-500 table-cell"
                    )}>
                      {user.email}</td>

                    <td className={classNames(
                      user.id !== mockUsers.length - 1
                        ? "border-b border-gray-200"
                        : "",
                      " whitespace-nowrap max-w-sm truncate px-3 py-4 text-sm text-gray-500 table-cell"
                    )}>
                      {user.gender}
                      </td>
                     
                    <td className="relative border-b border-gray-200 px-3 py-4 text-sm text-center text-gray-500">
                      <Menu as="div" className=" inline-block text-left z-50">
                        <Menu.Button className="flex items-center p-1 rounded-full hover:bg-gray-100 focus:outline-none">
                          <MoreVertical className="w-5 h-5 text-gray-500" />
                        </Menu.Button>

                        <Menu.Items className="absolute right-0 z-50  mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="px-1 py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                to={`/users/${1}`}
                                
                                  // onClick={() => console.log("View", user)}
                                  className={`${active ? "bg-gray-100" : ""
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-700`}
                                >
                                  View
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => handleAction("ban", user)}
                                  className={`${active ? "bg-gray-100" : ""
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-700`}
                                >
                                  Ban
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => console.log("Matches", user)}
                                  className={`${active ? "bg-gray-100" : ""
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-700`}
                                >
                                  Matches
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => console.log("Messages", user)}
                                  className={`${active ? "bg-gray-100" : ""
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-700`}
                                >
                                  Messages
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

      {isModalOpen && selectedUser && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`User: ${selectedUser.name}`}>
          {actionType === "edit" && (
            <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  defaultValue={selectedUser.name}
                  {...register("name", { required: true })}
                  className="p-2 mt-1 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">Name is required</p>}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  defaultValue={selectedUser.email}
                  {...register("email", { required: true })}
                  className="p-2 mt-1 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">Email is required</p>}
              </div>

              <div className="flex justify-end pt-4 space-x-3">
                <Button type="button" onClick={() => setIsModalOpen(false)} className="text-white bg-black">
                  Cancel
                </Button>
                <Button type="submit" className="w-20 text-white bg-primary-600">Save</Button>
              </div>
            </form>
          )}

          {actionType === "verify" && (
            <div className="space-y-6">
              <p className="text-sm text-gray-700">Are you sure you want to <span className="font-semibold text-green-600">verify</span> this user?</p>
              <div className="flex justify-end space-x-3">
                <Button onClick={() => setIsModalOpen(false)} className="text-white bg-black">Cancel</Button>
                <Button onClick={() => handleSave()} className="w-20 text-white bg-primary-600">Verify</Button>
              </div>
            </div>
          )}

          {actionType === "ban" && (
            <div className="space-y-6">
              <p className="text-sm text-gray-700">Are you sure you want to <span className="font-semibold text-red-600">ban</span> this user?</p>
              <div className="flex justify-end space-x-3">
                <Button onClick={() => setIsModalOpen(false)} className="text-white bg-black">Cancel</Button>
                <Button onClick={() => handleSave()} className="w-20 text-white bg-primary-600">Ban</Button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
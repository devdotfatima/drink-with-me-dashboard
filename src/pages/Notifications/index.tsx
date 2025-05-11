import { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Button } from "../../shared/components/button";

const mockUsers = [
  { id: "1", name: "Alice Johnson" },
  { id: "2", name: "Bob Smith" },
  { id: "3", name: "Charlie Brown" },
  { id: "4", name: "Diana Prince" },
];

export default function Notifications() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSendNotification = async () => {
    if (!title || !body || selectedUsers.length === 0) return;

    setLoading(true);
    setSuccess("");

    try {
      const response = await fetch("/api/send-fcm-notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          body,
          userIds: selectedUsers.map((u: {
            id: string;
            name: string;
          }) => u.id),
        }),
      });

      if (response.ok) {
        setSuccess("✅ Notification sent successfully!");
        setTitle("");
        setBody("");
        setSelectedUsers([]);
      } else {
        throw new Error("Failed to send notification");
      }
    } catch (err) {
      console.log(err);
      setSuccess("❌ Failed to send notification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <h1 className="mb-4 text-2xl font-semibold">Send Notification</h1>
      <div className="space-y-5">
        {/* Title */}
        <div>
          <label className="block mb-1 text-sm font-medium text-zinc-700">Title</label>
          <input
            className="w-full px-4 py-2 text-sm border rounded-lg border-zinc-300 bg-zinc-50 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Notification Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Message */}
        <div>
          <label className="block mb-1 text-sm font-medium text-zinc-700">Message</label>
          <textarea
            className="w-full px-4 py-2 text-sm border rounded-lg border-zinc-300 bg-zinc-50 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
            rows={5}
            placeholder="Enter your message to users"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        {/* Multi-select Listbox */}
        <div>
          <label className="block mb-1 text-sm font-medium text-zinc-700">Select Users</label>
          <Listbox
            value={selectedUsers}
            onChange={setSelectedUsers}
            multiple
          >
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white border border-zinc-300 py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 sm:text-sm">
                <span className="block truncate">
                  {selectedUsers.length > 0
                    ? selectedUsers.map((u: {
                      id: string;
                      name: string;
                    }) => u.name).join(", ")
                    : "Select users..."}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-zinc-400" />
                </span>
              </Listbox.Button>

              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {mockUsers.map((user) => (
                    <Listbox.Option
                      key={user.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-primary-100 text-primary-900" : "text-zinc-900"}`
                      }
                      value={user}
                    >
                      {({ selected }) => (
                        <>
                          <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                            {user.name}
                          </span>
                          {selected && (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600">
                              <CheckIcon className="h-5 w-5" />
                            </span>
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSendNotification}
          disabled={loading}
          className="w-full py-2 font-medium text-white bg-primary-600 hover:bg-primary-700"
        >
          {loading ? "Sending..." : "Send Notification"}
        </Button>

        {/* Status Message */}
        {success && (
          <div
            className={`text-sm text-center ${success.startsWith("✅") ? "text-green-600" : "text-red-500"}`}
          >
            {success}
          </div>
        )}
      </div>
    </div>
  );
}
const mockUsers = [
  {
    name: "Alice",
    profilePic: "https://randomuser.me/api/portraits/women/68.jpg",
    eventsAttended: 12,
    venueLikes: 30,
    matches: 5,
  },
  {
    name: "Bob",
    profilePic: "https://randomuser.me/api/portraits/men/45.jpg",
    eventsAttended: 10,
    venueLikes: 40,
    matches: 7,
  },
  {
    name: "Charlie",
    profilePic: "https://randomuser.me/api/portraits/men/76.jpg",
    eventsAttended: 14,
    venueLikes: 20,
    matches: 9,
  },
];

const UserLeaderboard = () => (
  <div className="p-5">
    <h1 className="mb-4 text-2xl font-semibold">Top Users Leaderboard</h1>
    <div className="flow-root border-0">
      <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
        <div className="relative min-w-full py-2 align-middle">
          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur sm:pl-6 lg:pl-8">
                  User
                </th>
                <th className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur">
                  Events Attended
                </th>
                <th className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur">
                  Venue Likes
                </th>
                <th className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pr-4 text-sm font-semibold text-right text-gray-900 backdrop-blur sm:pr-6 lg:pr-8">
                  Matches
                </th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user, index) => (
                <tr key={index}>
                  <td
                    className={`whitespace-nowrap px-3 py-4 text-sm text-gray-700 flex items-center gap-3 ${index !== mockUsers.length - 1 ? "border-b border-gray-200" : ""
                      }`}
                  >
                    <img
                      src={user.profilePic}
                      alt={`${user.name}'s avatar`}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    {user.name}
                  </td>
                  <td
                    className={`whitespace-nowrap px-3 py-4 text-sm text-gray-700 ${index !== mockUsers.length - 1 ? "border-b border-gray-200" : ""
                      }`}
                  >
                    {user.eventsAttended}
                  </td>
                  <td
                    className={`whitespace-nowrap px-3 py-4 text-sm text-gray-700 ${index !== mockUsers.length - 1 ? "border-b border-gray-200" : ""
                      }`}
                  >
                    {user.venueLikes}
                  </td>
                  <td
                    className={`whitespace-nowrap px-3 py-4 text-sm text-gray-700 text-right ${index !== mockUsers.length - 1 ? "border-b border-gray-200" : ""
                      }`}
                  >
                    {user.matches}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

export default UserLeaderboard;
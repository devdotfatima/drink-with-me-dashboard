import { useParams,useSearchParams } from "react-router-dom";

import TabsView, { TabItem } from "../../../shared/components/TabsView"; // adjust path as needed

const User = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "profile";
  const { username } = useParams();

  const mockUser = {
    name: "Mark Doe",
    username: username || "markdoe",
    bio: "Adventurer, photographer, and coffee enthusiast. Exploring the world one frame at a time.",
    joined: "March 2022",
    dateOfBirth: "1990-08-15",
    gender: "Male",
    interests: ["Photography", "Travel", "Coffee", "Hiking", "Tech"],
    favoritePlaces: ["Coffee Shops", "Nightclubs", "Social Spots"],
    goToDrink: ["Wine", "Cocktails", "Beer"],
    Vibe: ["Traveler in town", "Casual Meetups", "Celebrating Something"],
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    media: [
      { id: 1, type: "image", url: "https://source.unsplash.com/random/400x300?nature" },
      { id: 2, type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { id: 3, type: "image", url: "https://source.unsplash.com/random/400x300?city" },
    ],
  };

  const mockMatches = [
    {
      id: 1,
      name: "Emily Smith",
      username: "emilys",
      profileImage: "https://randomuser.me/api/portraits/women/45.jpg",
      matchedOn: "2025-04-20",
    },
    {
      id: 2,
      name: "Jake Johnson",
      username: "jakej",
      profileImage: "https://randomuser.me/api/portraits/men/28.jpg",
      matchedOn: "2025-04-22",
    },
  ];



  const mockMessages = [
    {
      id: 1,
      to: "emilys",
      content: "Hey Emily, it was great matching with you!",
      sentAt: "2025-04-20 15:30",
    },
    {
      id: 2,
      to: "jakej",
      content: "Hi Jake! I saw we both love hiking.",
      sentAt: "2025-04-22 18:45",
    },
  ];
  const handleBanUser = () => {
    alert(`${mockUser.name} has been banned.`);
  };

  const profileTab = (
    <div className="space-y-6">
      {/* Bio & Basic Info */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Bio</h3>
        <p className="text-gray-700">{mockUser.bio}</p>

        <div className="flex flex-wrap gap-4 text-sm text-gray-700">
          <p><span className="font-semibold">Date of Birth:</span> {new Date(mockUser.dateOfBirth).toLocaleDateString()}</p>
          <p><span className="font-semibold">Gender:</span> {mockUser.gender}</p>
        </div>
      </div>

      {/* Interests */}
      <div>
        <h4 className="font-semibold text-sm mb-1">Interests</h4>
        <div className="flex flex-wrap gap-2">
          {mockUser.interests.map((item, idx) => (
            <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">{item}</span>
          ))}
        </div>
      </div>

      {/* Favorite Places */}
      <div>
        <h4 className="font-semibold text-sm mb-1">Favorite Places</h4>
        <div className="flex flex-wrap gap-2">
          {mockUser.favoritePlaces.map((item, idx) => (
            <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">{item}</span>
          ))}
        </div>
      </div>

      {/* Go-to Drinks */}
      <div>
        <h4 className="font-semibold text-sm mb-1">Go-To Drink</h4>
        <div className="flex flex-wrap gap-2">
          {mockUser.goToDrink.map((item, idx) => (
            <span key={idx} className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-xs">{item}</span>
          ))}
        </div>
      </div>

      {/* Vibe */}
      <div>
        <h4 className="font-semibold text-sm mb-1">Vibe</h4>
        <div className="flex flex-wrap gap-2">
          {mockUser.Vibe.map((item, idx) => (
            <span key={idx} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">{item}</span>
          ))}
        </div>
      </div>
    </div>
  );

  const mediaTab = (
    <div>
      <h3 className="text-lg font-semibold mb-3">Media</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {mockUser.media.map((item) => (
          <div key={item.id} className="rounded-md overflow-hidden shadow-sm bg-gray-100">
            {item.type === "image" ? (
              <img src={item.url} alt={`Media ${item.id}`} className="w-full h-48 object-cover" />
            ) : (
              <video controls className="w-full h-48 object-cover">
                <source src={item.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const matchesTab = (
    <div>
      <h3 className="text-lg font-semibold mb-3">Matches</h3>
      {mockMatches.length > 0 ? (
        <ul className="space-y-4">
          {mockMatches.map((match) => (
            <li key={match.id} className="flex items-center gap-4">
              <img
                src={match.profileImage}
                alt={match.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">{match.name} (@{match.username})</p>
                <p className="text-sm text-gray-500">Matched on {new Date(match.matchedOn).toLocaleDateString()}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No match data yet.</p>
      )}
    </div>
  );

  const messagesTab = (
    <div>
      <h3 className="text-lg font-semibold mb-3">Messages</h3>
      {mockMessages.length > 0 ? (
        <ul className="space-y-4">
          {mockMessages.map((msg) => (
            <li key={msg.id} className="bg-gray-100 p-4 rounded-md shadow-sm">
              <p className="text-sm text-gray-800 mb-1">
                To <span className="font-medium">@{msg.to}</span>:
              </p>
              <p className="text-gray-700">{msg.content}</p>
              <p className="text-xs text-gray-500 mt-1">{new Date(msg.sentAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No messages yet.</p>
      )}
    </div>
  );

  const handleTabChange = (tabId: string) => {
    setSearchParams({ tab: tabId });
  };

  const tabs: TabItem[] = [
    { id: "profile", label: "Profile", content: profileTab },
    { id: "media", label: "Media", content: mediaTab },
    { id: "matches", label: "Matches", content: matchesTab },
    { id: "messages", label: "Messages", content: messagesTab },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Profile Header + Actions */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <img
            src={mockUser.profileImage}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover shadow-md"
          />
          <div>
            <h2 className="text-2xl font-bold">{mockUser.name}</h2>
            <p className="text-gray-600">@{mockUser.username}</p>
            <p className="text-sm text-gray-500">Joined {mockUser.joined}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleBanUser}
            className="px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition w-20"
          >
            Ban
          </button>
        </div>
      </div>

      {/* Tabs */}
      <TabsView tabs={tabs} activeTabId={activeTab}
        onTabChange={handleTabChange} />
    </div>
  );
};

export default User;
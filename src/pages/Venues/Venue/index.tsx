import { useParams, useSearchParams, } from "react-router-dom";
import TabsView, { TabItem } from "../../../shared/components/TabsView/index";

const dummyVenues = [
  {
    id: 1,
    name: "The Grape House",
    location: "Stockholm, Sweden",
    image: "https://www.eventsindustryforum.co.uk/images/articles/about_the_eif.jpg",
    description:
      "Charming wine venue offering curated tasting sessions and gourmet pairings.",
    socialLinks: {
      instagram: "https://instagram.com/grapehouse",
      website: "https://grapehouse.se",
    },
    popularDrinks: ["Pinot Noir", "Chardonnay", "Rosé"],
    openDays: ["Monday", "Wednesday", "Friday", "Saturday"],
    openTime: "17:00",
    closeTime: "23:00",
    likedBy: [
      {
        id: 1,
        name: "Emily Smith",
        profileImage: "https://randomuser.me/api/portraits/women/45.jpg",
      },
      {
        id: 2,
        name: "Jake Johnson",
        profileImage: "https://randomuser.me/api/portraits/men/28.jpg",
      },
    ],
    bookings: [
      {
        id: 1,
        eventName: "Exclusive Pinot Noir Session",
        type: "Private",
        time: "2025-05-10T18:00",
        durationDays: 1,
        members: ["Emily Smith", "Jake Johnson"],
      },
      {
        id: 2,
        eventName: "Rosé & Jazz Evening",
        type: "Public",
        time: "2025-05-12T20:00",
        durationDays: 2,
        members: ["Anna Lee"],
      },
    ],
  },
];

const Venue = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "overview";

  const venue = dummyVenues.find((v) => v.id === parseInt(id || "", 10));

  if (!venue) {
    return <div className="p-8 text-red-600 text-lg">Venue not found.</div>;
  }

  const handleTabChange = (tabId: string) => {
    setSearchParams({ tab: tabId });
  };

  const tabs: TabItem[] = [
    {
      id: "overview",
      label: "Overview",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-2xl shadow p-6">
          <img
            src={venue.image}
            alt={venue.name}
            className="rounded-xl w-full h-auto max-h-[400px] object-cover"
          />
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">{venue.name}</h2>
            <p className="text-gray-600">{venue.description}</p>
            <div className="text-sm text-gray-700 space-y-1">
              <p><strong>📍 Location:</strong> {venue.location}</p>
              <p><strong>🗓 Open Days:</strong> {venue.openDays.join(", ")}</p>
              <p><strong>🕰 Timings:</strong> {venue.openTime} – {venue.closeTime}</p>
              <p><strong>🍷 Popular Drinks:</strong> {venue.popularDrinks.join(", ")}</p>
              <p>
                <strong>🔗 Links:</strong>{" "}
                <a href={venue.socialLinks.instagram} className="text-primary-600 underline mr-3" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href={venue.socialLinks.website} className="text-primary-600 underline" target="_blank" rel="noopener noreferrer">Website</a>
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "likes",
      label: "People Who Liked",
      content: venue.likedBy.length > 0 ? (
        <ul className="space-y-4 bg-white rounded-2xl shadow p-6">
          {venue.likedBy.map((person) => (
            <li key={person.id} className="flex items-center gap-4">
              <img
                src={person.profileImage}
                alt={person.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <p className="font-medium text-gray-800">{person.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 bg-white rounded-2xl shadow p-6">No likes yet.</p>
      ),
    },
    {
      id: "bookings",
      label: "Bookings",
      content: venue.bookings.length > 0 ? (
        <div className="space-y-4 bg-white rounded-2xl shadow p-6">
          {venue.bookings.map((booking) => (
            <div
              key={booking.id}
              className="border border-gray-200 rounded-xl p-4 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-800">{booking.eventName}</p>
                <span className={`text-sm px-2 py-1 rounded-full ${booking.type === "Private" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                  {booking.type}
                </span>
              </div>
              <p className="text-gray-600 text-sm">🕒 Time: {booking.time}</p>
              <p className="text-gray-600 text-sm">📅 Duration: {booking.durationDays} {booking.durationDays === 1 ? "day" : "days"}</p>
              <p className="text-gray-600 text-sm">👥 Members: {booking.members.length}</p>
              <div className="flex items-center gap-2 flex-wrap mt-2">
                {booking.members.map((member, i) => (
                  <span
                    key={i}
                    className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {member}
                  </span>
                ))}
              </div>
              <div className="mt-3">
                <a
                  href={`/bookings/${booking.id}`}
                  className="text-sm text-primary-600 hover:underline font-medium"
                >
                  View Booking Details →
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 bg-white rounded-2xl shadow p-6">No bookings yet.</p>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{venue.name}</h1>
      <TabsView tabs={tabs} activeTabId={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default Venue;
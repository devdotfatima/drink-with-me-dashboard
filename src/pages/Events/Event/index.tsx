import { useParams } from "react-router-dom";

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
    image: "https://www.eventsindustryforum.co.uk/images/articles/about_the_eif.jpg",
    attendees: [
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
    ],
  },
];

const EventDetail = () => {
  const { id } = useParams();
  const event = dummyEvents.find((e) => e.id === parseInt(id || "", 10));

  if (!event) {
    return <div className="p-8 text-red-600 text-lg">Event not found.</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{event.title}</h1>

      <div className="bg-white shadow rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover max-h-[400px]"
        />
        <div className="p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Description</h2>
            <p className="text-gray-600">{event.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-4 text-sm text-gray-700">
            <p><span className="font-medium">Type:</span> {event.type}</p>
            <p><span className="font-medium">Venue:</span> {event.venue}</p>
            <p><span className="font-medium">Location:</span> {event.location}</p>
            <p><span className="font-medium">Date:</span> {event.date}</p>
            <p><span className="font-medium">Time:</span> {event.time}</p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Attendees</h2>
            <div>
              {event.attendees.length > 0 ? (
                <ul className="space-y-4">
                  {event.attendees.map((attendees) => (
                    <li key={attendees.id} className="flex items-center gap-4">
                      <img
                        src={attendees.profileImage}
                        alt={attendees.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium">{attendees.name} (@{attendees.username})</p>
                        <p className="text-sm text-gray-500">Matched on {new Date(attendees.matchedOn).toLocaleDateString()}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                  <p className="text-gray-500">       No attendees yet.</p>
              )}
            </div>
    </div>
  );
};

export default EventDetail;
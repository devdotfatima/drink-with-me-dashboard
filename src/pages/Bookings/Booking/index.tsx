import { useParams } from "react-router-dom";

const dummyBookings = [
  {
    bookingId: "1",
    bookedOn: "2025-04-10",
    bookingDays: 3,
    bookedBy: {
      id: 100,
      name: "Sophia Walker",
      username: "sophiaw",
      profileImage: "https://randomuser.me/api/portraits/women/12.jpg",
    },
    bookingType: "Wine Testing",
    bookingPrivacy: "Private",
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

const Booking = () => {
  const { id } = useParams();
  const booking = dummyBookings.find((b) => b.bookingId === id);

  if (!booking) {
    return <div className="p-8 text-red-600 text-lg">Booking not found.</div>;
  }

  const {
    bookedOn,
    bookingDays,
    bookedBy,
    bookingType,
    bookingPrivacy,
    attendees,
  } = booking;

  const dateFrom = new Date(bookedOn);
  const dateTo = new Date(dateFrom);
  dateTo.setDate(dateFrom.getDate() + bookingDays - 1); // -1 to include the start day

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Booking Info</h1>

      {/* Booking Metadata */}
      <div className="mb-10 p-6 rounded-2xl shadow space-y-4 text-gray-700 ">
        <div className="flex items-center gap-4">
          <img
            src={bookedBy.profileImage}
            alt={bookedBy.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-medium">Booked By: {bookedBy.name} (@{bookedBy.username})</p>
          </div>
        </div>
        <p><span className="font-medium">Booking Type:</span> {bookingType}</p>
        <p><span className="font-medium">Privacy:</span> {bookingPrivacy}</p>
        <p><span className="font-medium">Booking Days:</span> {bookingDays}</p>
        <p><span className="font-medium">Date From:</span> {dateFrom.toLocaleDateString()}</p>
        <p><span className="font-medium">Date To:</span> {dateTo.toLocaleDateString()}</p>
        <p><span className="font-medium">Total Attendees:</span> {attendees.length}</p>
      </div>

      {/* Attendees */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Attendees</h2>
        {attendees.length > 0 ? (
          <ul className="space-y-4">
            {attendees.map((person) => (
              <li key={person.id} className="flex items-center gap-4">
                <img
                  src={person.profileImage}
                  alt={person.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{person.name} (@{person.username})</p>
                  <p className="text-sm text-gray-500">
                    Matched on {new Date(person.matchedOn).toLocaleDateString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No attendees found.</p>
        )}
      </div>
    </div>
  );
};

export default Booking;
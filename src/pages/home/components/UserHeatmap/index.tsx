import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const mockCities = [
  { city: "New York", lat: 40.7128, lng: -74.006, users: 1200 },
  { city: "London", lat: 51.5074, lng: -0.1278, users: 900 },
  { city: "Tokyo", lat: 35.6895, lng: 139.6917, users: 1500 },
];

const UserHeatmap = () => (
  <div className="p-6 bg-white rounded-xl shadow">
    <h2 className="text-xl font-semibold mb-4">Geographic Heatmap</h2>
    <MapContainer center={[20, 0]} zoom={2} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {mockCities.map(({ city, lat, lng, users }) => (
        <CircleMarker
          key={city}
          center={[lat, lng]}
          radius={Math.sqrt(users) / 2}
          color="red"
        >
          <Tooltip direction="top" offset={[0, -10]} opacity={1}>
            <span>{city}: {users} users</span>
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  </div>
);

export default UserHeatmap;
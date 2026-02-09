import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for the default marker icon not showing up correctly in React
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function UserMap({ lat, long, userName }) {
  const position = [parseFloat(lat), parseFloat(long)];

  return (
    <div className="h-64 w-full rounded-xl overflow-hidden border border-gray-200 shadow-inner">
      <MapContainer
        center={position}
        zoom={3}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            {userName} is located here! <br />
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${lat},${long}`}
              target="_blank"
              className="text-blue-600 underline"
            >
              View on Google Maps
            </a>
            <p className=" text-gray-400 cursor-text italic">
              This location is being showed by the geolocation provided by user.
            </p>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

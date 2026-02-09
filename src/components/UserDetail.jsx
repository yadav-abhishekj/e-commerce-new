import { useState } from "react";
import UserMap from "./UserMap";

function UserDetail({ formattedUsers, map = false }) {
  const [copied, setCopied] = useState("");

  const copyText = async (label, value) => {
    await navigator.clipboard.writeText(value);
    setCopied(`${label}-${value}`);
    setTimeout(() => setCopied(""), 2000);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {formattedUsers.map((user) => (
        <div
          key={user.id}
          className="bg-white border-2 border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
        >
          {/* Top Section: Profile Header */}
          <div className="p-5 flex items-center gap-4 bg-linear-to-t from-white to-gray-200 border-b border-gray-300">
            <img
              src={user.image}
              alt={`${user.name.firstname} ${user.name.lastname}`}
              className="w-16 h-16 rounded-full border-2 border-white shadow-sm"
            />
            <div className="overflow-hidden">
              <div className="flex text-lg font-bold text-gray-800 truncate leading-tight gap-1">
                <p className="first-letter:capitalize">{user.name.firstname}</p>{" "}
                <p className="first-letter:capitalize">{user.name.lastname}</p>
              </div>
              <p className="text-sm text-gray-600 truncate">{user.email}</p>
            </div>
          </div>

          {/* Middle Section: Details */}
          <div className="p-5 space-y-4 flex-grow text-sm border-t border-gray-50">
            <div className="flex gap-3">
              <span className="text-gray-400">📍</span>
              <p className="text-gray-600 italic leading-snug">
                {user.address.street}, {user.address.number}
                <br />
                {user.address.city}, {user.address.zipcode}
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <span className="text-gray-400">📞</span>
              <p className="text-gray-600 font-medium">{user.phone}</p>
            </div>
          </div>

          {/* Bottom Section: Credentials (Clickable) */}
          <div className="p-4 bg-gray-50 grid grid-cols-2 gap-2 border-t border-gray-100">
            <button
              title="click to copy"
              onClick={() => copyText("user", user.username)}
              className="group relative flex flex-col items-start p-2 hover:bg-black rounded-lg transition-colors border text-gray-400 hover:text-white hover:border-gray-400"
            >
              <span className="text-[10px] uppercase tracking-wider  font-bold">
                Username
              </span>
              <span className="text-left text-blue-600 font-mono text-xs truncate w-full">
                {user.username}
              </span>
              {copied === `user-${user.username}` && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded">
                  Copied!
                </span>
              )}
            </button>

            <button
              title="click to copy"
              onClick={() => copyText("pass", user.password)}
              className="group relative flex flex-col items-start p-2 hover:bg-black rounded-lg transition-colors border text-gray-400 hover:text-white hover:border-gray-200"
            >
              <span className="text-[10px] uppercase tracking-wider font-bold">
                Password
              </span>
              <span className="text-left text-blue-600 font-mono text-xs truncate w-full tracking-tighter">
                ••••••••
              </span>
              {copied === `pass-${user.password}` && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded">
                  Copied!
                </span>
              )}
            </button>
          </div>
          {/* Map view in below */}
          {map && (
            <div className="p-4 border-t border-gray-100">
              <UserMap
                lat={user.address.geolocation.lat}
                long={user.address.geolocation.long}
                userName={user.username}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default UserDetail;

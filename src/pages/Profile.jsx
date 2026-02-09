import { useState } from "react";
import UserMap from "../components/UserMap";
import useAuthContext from "../hooks/useAuth";

function Profile() {
  const { state: authState } = useAuthContext();
  const [copied, setCopied] = useState("");

  const copyText = async (label, value) => {
    await navigator.clipboard.writeText(value);
    setCopied(`${label}-${value}`);
    setTimeout(() => setCopied(""), 2000);
  };

  const formattedUsers = {
    image: `https://ui-avatars.com/api/?name=${authState.user.name.firstname}+${authState.user.name.lastname}&background=random`,
    ...authState.user,
  };
  console.log({ formattedUsers });
  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">My Profile</h1>
      <p className="text-gray-700 text-lg">
        Welcome to your profile page! Here you can view and edit your personal
        information, manage your orders, and update your preferences.
      </p>
      {/* Top Section: Profile Header */}
      <div className="p-5 flex items-center justify-between bg-linear-to-t from-white to-gray-200 border-b border-gray-300">
        <div className="p-5 flex items-center gap-4">
          <img
            src={formattedUsers.image}
            alt={`${formattedUsers.name.firstname} ${formattedUsers.name.lastname}`}
            className="w-16 h-16 rounded-full border-2 border-white shadow-sm"
          />
          <div className="overflow-hidden">
            <div className="flex text-lg font-bold text-gray-800 truncate leading-tight gap-1">
              <p className="first-letter:capitalize">
                {formattedUsers.name.firstname}
              </p>{" "}
              <p className="first-letter:capitalize">
                {formattedUsers.name.lastname}
              </p>
            </div>
            <p className="text-sm text-gray-600 truncate">
              {formattedUsers.email}
            </p>
          </div>
        </div>
        {/* Bottom Section: Credentials (Clickable) */}
        <div className="p-4 grid grid-cols-2 gap-2 border-t rounded-2xl border-gray-100">
          <button
            title="click to copy"
            onClick={() => copyText("user", formattedUsers.username)}
            className="group relative flex flex-col items-start p-2 hover:bg-black ease-in-out duration-400 rounded-lg transition-all text-gray-400 hover:text-white"
          >
            <span className="text-[15px] uppercase tracking-wider font-bold">
              Username
            </span>
            <span className="text-left text-blue-600 font-mono text-xs truncate w-full tracking-tighter">
              {formattedUsers.username}
            </span>
            {copied === `user-${formattedUsers.username}` && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded">
                Copied!
              </span>
            )}
          </button>

          <button
            title="click to copy"
            onClick={() => copyText("pass", formattedUsers.password)}
            className="group relative flex flex-col items-start p-2 hover:bg-black ease-in-out duration-400 rounded-lg transition-all text-gray-400 hover:text-white"
          >
            <span className="text-[15px] uppercase tracking-wider font-bold">
              Password
            </span>
            <span className="text-left text-blue-600 font-mono text-xs truncate w-full tracking-tighter">
              ••••••••
            </span>
            {copied === `pass-${formattedUsers.password}` && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded">
                Copied!
              </span>
            )}
          </button>
        </div>
      </div>
      {/* Middle Section: Details */}
      <div className="p-5 space-y-4 grow text-sm border-t border-gray-50">
        <div className="flex gap-3">
          <span className="text-gray-400">📍</span>
          <p className="text-gray-600 italic leading-snug">
            {formattedUsers.address.street}, {formattedUsers.address.number}
            <br />
            {formattedUsers.address.city}, {formattedUsers.address.zipcode}
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <span className="text-gray-400">📞</span>
          <p className="text-gray-600 font-medium">{formattedUsers.phone}</p>
        </div>
      </div>
      <UserMap
        lat={formattedUsers.address.geolocation.lat}
        long={formattedUsers.address.geolocation.long}
        userName={formattedUsers.username}
      />
    </div>
  );
}

export default Profile;

import UserMap from "../components/UserMap";
import useAuthContext from "../hooks/useAuth";

function Profile() {
  const { state: authState } = useAuthContext();

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
            src={authState.user?.image}
            alt={authState.user?.name}
            className="w-16 h-16 rounded-full border-2 border-white shadow-sm"
          />
          <div className="overflow-hidden">
            <div className="flex text-lg font-bold text-gray-800 truncate leading-tight gap-1">
              <p className="first-letter:capitalize">
                {authState.user?.name}
              </p>{" "}
            </div>
            <p className="text-sm text-gray-600 truncate">
              {authState.user?.email}
            </p>
          </div>
        </div>
      </div>
      {/* Middle Section: Details */}
      <div className="p-5 space-y-4 grow text-sm border-t border-gray-50">
        <div className="flex gap-3">
          <span className="text-gray-400">📍</span>
          <p className="text-gray-600 italic leading-snug">
            {authState.user?.address?.street}, {authState.user?.address?.number}
            <br />
            {authState.user?.address?.city}, {authState.user?.address?.zipcode}
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <span className="text-gray-400">📞</span>
          <p className="text-gray-600 font-medium">{authState.user?.phone}</p>
        </div>
      </div>
      <UserMap
        lat={+authState.user?.address?.geolocation?.lat}
        long={+authState.user?.address?.geolocation?.long}
        userName={authState.user?.name}
      />
    </div>
  );
}

export default Profile;

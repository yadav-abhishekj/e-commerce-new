import { useEffect, useState, useMemo } from "react";
import { fetchUserList } from "../services/userService";
import UserDetail from "../components/UserDetail";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function loadUsers() {
      try {
        setLoading(true);
        const data = await fetchUserList();
        if (isMounted) setUsers(data);
      } catch (err) {
        if (isMounted) setError("Failed to load users");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadUsers();
    return () => {
      isMounted = false;
    };
  }, []);

  const formattedUsers = useMemo(() => {
    return users.map((user) => ({
      ...user,
      image: `https://ui-avatars.com/api/?name=${user.name.firstname}+${user.name.lastname}&background=random`,
    }));
  }, [users]);

  if (loading)
    return (
      <div className="flex justify-center p-20 text-xl font-light">
        Loading users...
      </div>
    );
  if (error)
    return (
      <div className="p-6 text-red-600 bg-red-50 rounded-lg m-6">{error}</div>
    );

  return (
    <div className="max-w-7xl  p-6 bg-gray-50 min-h-screen">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">User Directory</h2>
          <p className="text-gray-500 mt-1">
            Manage and view all registered system users.
          </p>
        </div>
        <div className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          {formattedUsers.length} Total Users
        </div>
      </header>

      <UserDetail formattedUsers={formattedUsers} map={true} />
    </div>
  );
}

import { useEffect, useState } from "react";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/users`) // Ensure this route exists in backend
      .then(res => setUsers(res.data))
      .catch(err => console.error("Failed to fetch users", err));
  }, []);

  const handleMakeAdmin = async (id) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/user/${id}`, { role: "admin" });
      const updatedUsers = users.map(user =>
        user._id === id ? { ...user, role: "admin" } : user
      );
      setUsers(updatedUsers);
    } catch (err) {
      console.error("Failed to make admin", err);
    }
  };

  return (
    <div className="p-4 ">
      <h2 className="text-2xl font-semibold mb-4">All Users</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr className="text-black">
              <th className="p-2 text-left">#</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Profile</th>
              <th className="p-2 text-left">Role</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id} className="border-t text-black bg-white">
                <td className="p-2">{idx + 1}</td>
                <td className="p-2">{user.name}</td>
                <td className="p-2 ">{user.email}</td>
                <td className="p-2">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="p-2 capitalize">{user.role}</td>
                <td className="p-2">
                  {user.role === "admin" ? (
                    <span className="text-green-600 font-semibold">Admin</span>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;

import { Outlet, NavLink, useNavigate, Link } from "react-router";
import {
  FaHome,
  FaUsers,
  FaFileAlt,
  FaPlusCircle,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import logo from "../assets/star.png";
import { useState } from "react";

const DashboardLayout = () => {
  const { signOutUser } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOutUser();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Mobile Toggle Button */}
      <button
        className="absolute top-4 left-4 z-50 md:hidden text-2xl p-2 bg-gray-100 rounded-full shadow"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed z-40 top-0 left-0 h-full w-64 bg-gray-100 p-6 flex flex-col justify-between transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static`}
      >
        {/* Top Navigation */}
        <div>
          <Link to="/">
            <div className="flex items-center mb-2 relative">
              <img className="w-7 relative -top-2" src={logo} alt="" />
              <h2 className="text-2xl text-black font-bold mb-6">Star News</h2>
            </div>
          </Link>
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-2 text-black px-3 py-2 rounded ${
                    isActive
                      ? "bg-blue-100 font-semibold"
                      : "hover:bg-gray-200"
                  }`
                }
                end
              >
                <FaHome /> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/manage-articles"
                className={({ isActive }) =>
                  `flex items-center text-black gap-2 px-3 py-2 rounded ${
                    isActive
                      ? "bg-blue-100 font-semibold"
                      : "hover:bg-gray-200"
                  }`
                }
              >
                <FaFileAlt /> Manage Articles
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/manage-users"
                className={({ isActive }) =>
                  `flex items-center text-black gap-2 px-3 py-2 rounded ${
                    isActive
                      ? "bg-blue-100 font-semibold"
                      : "hover:bg-gray-200"
                  }`
                }
              >
                <FaUsers /> Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/add-publisher"
                className={({ isActive }) =>
                  `flex items-center text-black gap-2 px-3 py-2 rounded ${
                    isActive
                      ? "bg-blue-100 font-semibold"
                      : "hover:bg-gray-200"
                  }`
                }
              >
                <FaPlusCircle /> Add Publisher
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Bottom Section */}
        <div className="space-y-4 mt-8">
          <NavLink
            to="/"
            className="flex items-center text-black gap-2 px-3 py-2 rounded hover:bg-gray-200"
          >
            <FaHome /> Back to Home
          </NavLink>

          <button
            onClick={handleLogout}
            className="flex items-center cursor-pointer gap-2 px-3 py-2 w-full text-left rounded hover:bg-red-100 text-red-500"
          >
            <FaSignOutAlt /> Logout
          </button>

          <p className="text-xs text-gray-500 mt-6 text-center">
            © 2025 Cura News. All rights reserved.
          </p>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Main Content */}
<main className="flex-1 overflow-y-auto p-4 md:p-6 h-full bg-gray-50">
  <div className="bg-white shadow rounded-lg p-6 w-full">
    <Outlet />
  </div>
</main>

    </div>
  );
};

export default DashboardLayout;

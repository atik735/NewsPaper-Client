import { Link, NavLink } from "react-router";
import logo from "../../../assets/star.png";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { FaUserCircle } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Navbar = () => {
  const { user, signOutUser, loading } = useAuth();

  const { data: dbUser, isLoading } = useQuery({
    queryKey: ["dbUser", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user?email=${user.email}`
      );
      return res.data;
    },
  });

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        Swal.fire({
          title: "Sign Out Successful!",
          icon: "success",
          timer: 1500,
        });
      })
      .catch((error) => console.log(error));
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-[#00001A] font-bold" : "text-gray-700"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allArticles"
          className={({ isActive }) =>
            isActive ? "text-[#00001A] font-bold" : "text-gray-700"
          }
        >
          All Articles
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contactUs"
          className={({ isActive }) =>
            isActive ? "text-[#00001A] font-bold" : "text-gray-700"
          }
        >
          ContactUs
        </NavLink>
      </li>

      {!loading && user && dbUser?.role === "customer" && (
        <>
          <li>
            <NavLink
              to="/addArticles"
              className={({ isActive }) =>
                isActive ? "text-[#00001A] font-bold" : "text-gray-700"
              }
            >
              Add Articles
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/myArticles"
              className={({ isActive }) =>
                isActive ? "text-[#00001A] font-bold" : "text-gray-700"
              }
            >
              My Articles
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/subscription"
              className={({ isActive }) =>
                isActive ? "text-[#00001A] font-bold" : "text-gray-700"
              }
            >
              Subscription
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/premium"
              className={({ isActive }) =>
                isActive ? "text-[#00001A] font-bold" : "text-gray-700"
              }
            >
              Premium Articles
            </NavLink>
          </li>
        </>
      )}

      {!loading && dbUser?.role === "admin" && (
        <>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "text-[#00001A] font-bold" : "text-gray-700"
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/addArticles"
              className={({ isActive }) =>
                isActive ? "text-[#00001A] font-bold" : "text-gray-700"
              }
            >
              Add Articles
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/myArticles"
              className={({ isActive }) =>
                isActive ? "text-[#00001A] font-bold" : "text-gray-700"
              }
            >
              My Articles
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/subscription"
              className={({ isActive }) =>
                isActive ? "text-[#00001A] font-bold" : "text-gray-700"
              }
            >
              Subscription
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/premium"
              className={({ isActive }) =>
                isActive ? "text-[#00001A] font-bold" : "text-gray-700"
              }
            >
              Premium Articles
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  if (isLoading && user) {
    return (
      <div className="navbar bg-white shadow-sm px-4 py-2">
        <div className="loading loading-spinner mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="navbar sticky top-0 z-50 bg-white md:px-16 shadow-sm">
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img className="w-7 max-md:w-5" src={logo} alt="" />
          <h3 className="font-bold text-lg ml-1 sm:text-xl text-[#00001A]">
            Star News
          </h3>
        </Link>
      </div>
      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      {/* Right Side */}
      <div className="navbar-end space-x-3">
        {user ? (
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full overflow-hidden border">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              ) : dbUser?.image ? (
                <img
                  src={dbUser.image}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUserCircle className="w-full h-full text-gray-400" />
              )}
            </div>
            <button
              onClick={handleSignOut}
              className="btn btn-sm text-white bg-[#00001A] hover:bg-[#2e2e2e]"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="space-x-3">
            <Link
              to="/login"
              className="btn text-white bg-[#00001A] hover:bg-[#2e2e2e]"
            >
              SignIn
            </Link>
            <Link
              to="/signup"
              className="btn text-white bg-[#00001A] hover:bg-[#2e2e2e]"
            >
              SignUp
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

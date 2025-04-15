import React, { useEffect, useState } from "react";
import ThemeController from "./common/ThemeController";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { removeUser } from "../utils/userSlice";
import {
  APP_BASE_URL,
  GET_CONNECTION_REQUESTS,
  LOGOUT,
} from "../utils/constants";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [totalRequests, setTotalRequests] = useState(0);
  const handleLogout = async () => {
    const response = await axios.get(APP_BASE_URL + LOGOUT, {
      withCredentials: true,
    });
    dispatch(removeUser());
    navigate("/login");
  };

  const fetchRequests = async () => {
    const userRequests = await axios.get(
      APP_BASE_URL + GET_CONNECTION_REQUESTS,
      {
        withCredentials: true,
      }
    );
    setTotalRequests(userRequests.data.length);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const user = useSelector((state) => state.user);
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl">
          DEV👨‍💻
        </Link>
      </div>
      {user && (
        <div className="flex-none mx-5">
          <div className="dropdown">
            <>Welcome, {user.firstName}</>
          </div>
          <div className="dropdown dropdown-end">
            <Link to={"/requests"}>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.1 4.2c1.8-1.8 4.8-1.8 6.6 0 1.9 1.9 1.9 5 0 6.9L12 18.7 5.3 11c-1.9-1.9-1.9-5 0-6.9 1.8-1.8 4.8-1.8 6.6 0l.1.1.1-.1z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <span className="badge badge-xs indicator-item">
                    {totalRequests}
                  </span>
                </div>
              </div>
            </Link>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={"/profile"} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to={"/connections"}>Connections</Link>
              </li>
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
              <li>
                <a>
                  <span>Change Theme:</span>
                  <ThemeController />
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

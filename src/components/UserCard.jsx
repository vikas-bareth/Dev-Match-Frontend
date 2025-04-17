import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { APP_BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";
import { useBadge } from "../context/BadgeContext";

const UserCard = ({ user }) => {
  const loggedUser = useSelector((state) => state.user);
  const { showBadge } = useBadge();
  const dispatch = useDispatch();
  const handleUserInterestAction = async (status, id) => {
    try {
      const response = await axios.post(
        APP_BASE_URL + "/request/" + status + "/" + id,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        dispatch(removeUserFromFeed(id));
        showBadge(response.data, "success");
      }
    } catch (error) {
      console.error("ERROR IN CONNECTION REQUEST:", error);
    }
  };
  if (!user || !loggedUser) return null;

  const { _id, photoUrl, firstName, lastName, age, gender, skills, about } =
    user;

  return (
    <div className="max-w-sm bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <figure>
        <img
          src={photoUrl}
          alt="profile-image"
          className="w-full h-72 object-cover"
        />
      </figure>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-100">
          {firstName} {lastName}
        </h2>
        <p className="mt-2 text-gray-400 text-sm">
          {age} years old, {gender}
        </p>
        <p className="mt-4 text-gray-300 text-sm">{about}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {skills &&
            skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-700 text-gray-200 text-xs px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
        </div>
        {loggedUser.firstName !== firstName && (
          <div className="mt-6 flex justify-center gap-4">
            <button
              className="px-4 py-2 bg-red-600 text-gray-100 rounded-md hover:bg-red-500"
              onClick={() => handleUserInterestAction("IGNORE", _id)}
            >
              Ignore
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-gray-100 rounded-md hover:bg-blue-500"
              onClick={() => handleUserInterestAction("INTERESTED", _id)}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;

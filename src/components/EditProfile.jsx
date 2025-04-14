import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import { APP_BASE_URL, UPDATE_USER } from "../utils/constants";
import Toast from "./common/Toast";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("Data Send success!");
  const { firstName, lastName, emailId, age, gender, photoUrl, about, skills } =
    user;

  const handleChange = (field, value) => {
    dispatch(addUser({ ...user, [field]: value }));
  };

  const handleSaveClick = async (user) => {
    setShowToast(true);
    const result = await axios.patch(
      APP_BASE_URL + UPDATE_USER,
      { user },
      { withCredentials: true }
    );
    const { data } = result.data;
    dispatch(addUser(data));

    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="p-6 max-w-4xl  bg-gray-900 text-gray-100 shadow-lg rounded-lg">
      {!setShowToast && <Toast message={toastMessage} />}
      <h1 className="text-2xl font-bold mb-6 text-gray-100">Edit Profile</h1>

      <div className="flex items-center mb-6">
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="w-24 h-24 rounded-full object-cover border border-gray-700"
        />
        <div className="ml-4">
          <label className="block text-sm font-medium text-gray-300">
            Update Profile Photo
          </label>
          {/* <input
            type="file"
            className="mt-2 text-sm text-gray-400 file:bg-gray-800 file:border-gray-600 file:text-gray-200 file:rounded-md"
            accept="image/*"
            onChange={(e) => handleChange("photoUrl", e.target.files[0])}
          /> */}
          <input
            id="first-name"
            type="text"
            defaultValue={photoUrl}
            className="input mt-1 w-full bg-gray-800 border-gray-700 text-gray-100 rounded-md shadow-sm"
            onChange={(e) => handleChange("photoUrl", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="first-name"
            className="block text-sm font-medium text-gray-300"
          >
            First Name
          </label>
          <input
            id="first-name"
            type="text"
            defaultValue={firstName}
            className="input mt-1 w-full bg-gray-800 border-gray-700 text-gray-100 rounded-md shadow-sm"
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="last-name"
            className="block text-sm font-medium text-gray-300"
          >
            Last Name
          </label>
          <input
            id="last-name"
            type="text"
            defaultValue={lastName}
            className="input mt-1 w-full bg-gray-800 border-gray-700 text-gray-100 rounded-md shadow-sm"
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            defaultValue={emailId}
            className="input mt-1 w-full bg-gray-800 border-gray-700 text-gray-100 rounded-md shadow-sm"
            onChange={(e) => handleChange("emailId", e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-300"
          >
            Age
          </label>
          <input
            id="age"
            type="number"
            defaultValue={age}
            className="input mt-1 w-full bg-gray-800 border-gray-700 text-gray-100 rounded-md shadow-sm"
            onChange={(e) => handleChange("age", e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-300"
          >
            Gender
          </label>
          <select
            id="gender"
            defaultValue={gender}
            className="input mt-1 w-full bg-gray-800 border-gray-700 text-gray-100 rounded-md shadow-sm"
            onChange={(e) => handleChange("gender", e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label
          htmlFor="about"
          className="block text-sm font-medium text-gray-300"
        >
          About
        </label>
        <textarea
          id="about"
          defaultValue={about}
          className="input mt-1 w-full bg-gray-800 border-gray-700 text-gray-100 rounded-md shadow-sm h-20"
          onChange={(e) => handleChange("about", e.target.value)}
        ></textarea>
      </div>

      <div className="mt-6">
        <label
          htmlFor="skills"
          className="block text-sm font-medium text-gray-300"
        >
          Skills
        </label>
        {/* <div className="flex flex-wrap gap-2 mt-2">
          {skills?.map((skill, index) => (
            <span
              key={index}
              className="bg-gray-800 text-gray-200 text-sm px-3 py-1 rounded-lg"
            >
              {skill}
            </span>
          ))}
          <input
            id="skills"
            type="text"
            placeholder="Add new skill"
            className="input mt-1 bg-gray-800 border-gray-700 text-gray-100 rounded-md shadow-sm"
            onChange={(e) =>
              handleChange("skills", [...skills, e.target.value])
            }
          />
        </div> */}
      </div>

      <div className="mt-8 flex justify-end">
        <button className="bg-gray-700 text-gray-300 px-4 py-2 rounded-md mr-2 hover:bg-gray-600">
          Cancel
        </button>
        <button
          onClick={() => handleSaveClick(user)}
          className="bg-blue-500 text-gray-100 px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfile;

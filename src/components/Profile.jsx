import React from "react";
import EditProfile from "./EditProfile";
import UserCard from "./UserCard";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.user); // Assuming `profile` is the slice name
  if (!user) return;
  return (
    <div className="flex items-center gap-5 justify-center  mt-5">
      <EditProfile user={user} />
      <UserCard user={user} />
    </div>
  );
};

export default Profile;

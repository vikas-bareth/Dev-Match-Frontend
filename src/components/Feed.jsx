import axios from "axios";
import React, { useEffect, useState } from "react";
import { APP_BASE_URL, GET_FEED } from "../utils/constants";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const feedUsers = useSelector((state) => state.feed);
  const getFeed = async () => {
    const feedUsersResponse = await axios.get(APP_BASE_URL + GET_FEED, {
      withCredentials: true,
    });
    dispatch(addFeed(feedUsersResponse.data));
  };
  useEffect(() => {
    getFeed();
  }, []);
  if (!feedUsers || feedUsers.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-xl font-semibold text-gray-600">
          NO NEW USERS FOUND FOR FEED!
        </h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-15">
      {feedUsers && <UserCard user={feedUsers[0]} />}
    </div>
  );
};

export default Feed;

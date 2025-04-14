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
    console.log("feedResponse:", feedUsersResponse.data);
    dispatch(addFeed(feedUsersResponse.data));
  };
  useEffect(() => {
    getFeed();
  }, []);
  return (
    <div className="flex justify-center mt-15">
      {feedUsers && <UserCard user={feedUsers[0]} />}
    </div>
  );
};

export default Feed;

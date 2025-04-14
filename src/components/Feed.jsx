import axios from "axios";
import React, { useEffect, useState } from "react";
import { APP_BASE_URL, GET_FEED } from "../utils/constants";
import UserCard from "./UserCard";

const Feed = () => {
  const [feedUsers, setFeedUsers] = useState(null);
  const getFeed = async () => {
    const feedUsersResponse = await axios.get(APP_BASE_URL + GET_FEED, {
      withCredentials: true,
    });
    console.log("feedResponse:", feedUsersResponse.data);
    setFeedUsers(feedUsersResponse.data);
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

import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { APP_BASE_URL, GET_CONNECTION_REQUESTS } from "../utils/constants";
import { addRequests } from "../utils/requestSlice";
import RequestCard from "./RequestCard";

const Requests = () => {
  const requests = useSelector((state) => state.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    const userRequests = await axios.get(
      APP_BASE_URL + GET_CONNECTION_REQUESTS,
      {
        withCredentials: true,
      }
    );
    const requestData = userRequests.data;
    dispatch(addRequests(requestData));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0)
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-xl font-semibold text-gray-600">NO NEW REQUESTS</h1>
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Connection Requests
      </h1>
      <div className="flex flex-col items-center">
        {requests.map((request) => (
          <RequestCard key={request._id} request={request} />
        ))}
      </div>
    </div>
  );
};

export default Requests;

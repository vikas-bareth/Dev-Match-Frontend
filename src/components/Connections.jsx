import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { APP_BASE_URL, GET_CONNECTIONS } from "../utils/constants";
import { addConnections } from "../utils/connectionSlice";
import ConnectionCard from "./ConnectionCard";

const Connections = () => {
  const connections = useSelector((state) => state.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    const userConnections = await axios.get(APP_BASE_URL + GET_CONNECTIONS, {
      withCredentials: true,
    });
    const connectionData = userConnections.data;
    dispatch(addConnections(connectionData));
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0)
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-xl font-semibold text-gray-600">
          NO NEW CONNECTIONS
        </h1>
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Connections</h1>
      <div className="flex flex-col items-center">
        {connections.map((connection) => (
          <ConnectionCard key={connection._id} connection={connection} />
        ))}
      </div>
    </div>
  );
};

export default Connections;

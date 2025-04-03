import React, { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUsers = async () => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/users");
  return response.data;
};

const OptimizedAPI = () => {
  const { data, isLoading, error, refetch } = useQuery("users", fetchUsers, {
    staleTime: 60000, // Cache API response for 1 minute
  });

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <h2>Loading Users...</h2>;
  if (error) return <h2>Error fetching users</h2>;

  return (
    <div>
      <h2>Optimized API Calls</h2>
      <button onClick={handleRefresh}>Refresh</button>
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default OptimizedAPI;

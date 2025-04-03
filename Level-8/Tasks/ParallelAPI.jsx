import React, { useState, useEffect } from "react";
import axios from "axios";

const ParallelAPIRequests = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [postsResponse, usersResponse] = await Promise.all([
          axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5"),
          axios.get("https://jsonplaceholder.typicode.com/users?_limit=5")
        ]);

        setData({
          posts: postsResponse.data,
          users: usersResponse.data,
        });
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Posts</h2>
      {data.posts &&
        data.posts.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}

      <h2>Users</h2>
      {data.users &&
        data.users.map((user) => (
          <div key={user.id}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        ))}
    </div>
  );
};

export default ParallelAPIRequests;

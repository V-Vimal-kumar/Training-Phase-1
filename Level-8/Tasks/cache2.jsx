import React from "react";
import UseAxios from "./cache";

const UseAxiosComponent = () => {
  const { data, loading, error, refetch } = UseAxios(
    "https://jsonplaceholder.typicode.com/posts/1"
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Post Title</h2>
      <p>{data?.title}</p>
      <p>{data?.body}</p>
      <button onClick={refetch}>Refresh</button>
    </div>
  );
};

export default UseAxiosComponent;

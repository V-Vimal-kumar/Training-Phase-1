import { useEffect, useState } from "react";

function Fetch() {
  const [data, setData] = useState(null);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch("https://jsonplaceholder.typicode.com/todos/1");
        if (!resp.ok) {
          throw new Error("Failed to fetch data!");
        }
        const result = await resp.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoad(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Fetch</h2>
      {load && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && (
        <div>
          <p>ID:{data.id}</p>
          <p>Title: {data.title}</p>
          <p>Completed: {data.completed ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
}

export default Fetch;

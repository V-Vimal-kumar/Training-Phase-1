import React, { useState } from "react";
import { useLoading } from "./Interceptors/AxInter";
import { api } from "./Interceptors/AxInter"; 

const App = () => {
  const loading = useLoading();
  const [data, setData] = useState(null); 

  const fetchData = async () => {
    try {
      const response = await api.get("/posts/1"); 
      setData(response.data); 
    } catch (error) {
      console.error("API request failed");
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      <button onClick={fetchData}>Fetch Data</button>
      {data && (
        <div>
          <h3>{data.title}</h3>
          <p>{data.body}</p>
        </div>
      )}
    </div>
  );
};

export default App;

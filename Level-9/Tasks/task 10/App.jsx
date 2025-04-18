import React, { lazy, Suspense, memo } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FixedSizeList as List } from "react-window";

const queryClient = new QueryClient();

const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);
const Row = memo(({ index, style }) => <div style={style}>{items[index]}</div>);

const LargeList = memo(() => (
  <div>
    <h2>Virtual Scrolling</h2>
    <List height={400} width={"100%"} itemSize={35} itemCount={items.length}>
      {Row}
    </List>
  </div>
));

const fetchUsers = async () => {
  const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
  return data;
};

const OptimizedAPI = memo(() => {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users</p>;

  return (
    <div>
      <h2>Optimized API Calls</h2>
      <ul>{users.map((user) => <li key={user.id}>{user.name}</li>)}</ul>
    </div>
  );
});

// App Component
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <nav>
          <ul>
            <li><Link to="/large-list">Large List</Link></li>
            <li><Link to="/optimized-api">Optimized API</Link></li>
          </ul>
        </nav>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/large-list" element={<LargeList />} />
            <Route path="/optimized-api" element={<OptimizedAPI />} />
          </Routes>
        </Suspense>
      </Router>
    </QueryClientProvider>
  );
};

export default App;

import React, { useState } from "react";

function Search() {
  const [search, setSearch] = useState("");
  const items = ["pradeep", "sanjay", "vimal", "akash"];

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => <li key={index}>{item}</li>)
        ) : (
          <li>Can't find!</li>
        )}
      </ul>
    </div>
  );
}

export default Search;

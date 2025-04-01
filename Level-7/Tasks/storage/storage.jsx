import React, { useState } from "react";
import UseLocalStorage from "./stor2";

function NameSaver() {
  const [name, setName] = UseLocalStorage("username", "");
  const [input, setInput] = useState("");

  return (
    <div>
      <h1>Stored Name: {name || "No name stored"}</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={() => setName(input)}>Save Name</button>
      <button onClick={() => setName("")}>Clear Name</button>
    </div>
  );
}

export default NameSaver;

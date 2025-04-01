import React from "react";
import UseLocalStorage from "./focus";

function LocalStorageComponent() {
    const [name, setName] = UseLocalStorage("username", "");

    return (
        <div>
            <h2>Persisted Name: {name}</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
            />
        </div>
    );
}

export default LocalStorageComponent;

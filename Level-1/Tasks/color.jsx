import React, { useState } from "react";

function Background() {
    const [bgColor, setBgColor] = useState("skyblue");

    const pageStyle = {
        width: "100vw",
        height: "100vh",
        backgroundColor: bgColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        color: "red",
        fontSize: "24px",
    };

    return (
        <div style={pageStyle}>
            <p>Background is {bgColor}</p>
            <button onClick={() => setBgColor("lightcoral")}>Red</button>
            <button onClick={() => setBgColor("lightgreen")}>Green</button>
            <button onClick={() => setBgColor("lightblue")}>Blue</button>
        </div>
    );
}

export default Background;

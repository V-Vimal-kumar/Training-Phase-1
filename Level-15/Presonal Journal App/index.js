const express = require("express");
const app = express();
const journalRoutes = require("./routes/journalRoutes");
require("dotenv").config();

app.use(express.json());
app.use("/journal", journalRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

const connectDB = require("../db/connect");

const getCollection = async () => {
  const db = await connectDB();
  return db.collection("entries");
};

module.exports = getCollection;

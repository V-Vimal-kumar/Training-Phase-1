const getCollection = require("../models/journalModel");
const { ObjectId } = require("mongodb");

exports.createEntry = async (req, res) => {
  try {
    const entry = { ...req.body, date: new Date(), tags: req.body.tags || [] };
    const collection = await getCollection();
    const result = await collection.insertOne(entry);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to create entry" });
  }
};

exports.getEntries = async (req, res) => {
  try {
    const { title, tag } = req.query;
    const filter = {};

    if (title) filter.title = new RegExp(title, "i");
    if (tag) filter.tags = tag;

    const collection = await getCollection();
    const entries = await collection.find(filter).toArray();
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: "Failed to get entries" });
  }
};

exports.updateEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const collection = await getCollection();
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to update entry" });
  }
};

exports.deleteEntry = async (req, res) => {
  try {
    const { id } = req.params;

    const collection = await getCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete entry" });
  }
};

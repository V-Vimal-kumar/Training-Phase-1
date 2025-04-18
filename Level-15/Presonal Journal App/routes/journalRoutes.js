const express = require("express");
const router = express.Router();
const controller = require("../controllers/journalControllers");

router.post("/", controller.createEntry);
router.get("/", controller.getEntries);
router.put("/:id", controller.updateEntry);
router.delete("/:id", controller.deleteEntry);

module.exports = router;

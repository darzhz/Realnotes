const express = require("express");
const router = express.Router();
const path = require("path");
const note = require("../model/notes");
router.get("/", async (req, res) => {
  let packet = {
    NumD: await note.count(),
    NumL: clients.length,
    NumS: await note.getViewInc(),
  };
  await res.send(JSON.stringify(packet));
});
module.exports = router;
const express = require("express");
const router = express.Router();
const util = require("../lib/util");
const note = require("../model/notes");
router.get("/:id",async (req, res, next) => {
  if (req.params.id.length >= 4 && req.params.id.length <= 14) {
    let data  = note.search(req.params.id);
    res.send(await data);
    util.alertMe(req);
  } else {
    res.send(
      "invalid codes"
    );
  }
});
module.exports = router;
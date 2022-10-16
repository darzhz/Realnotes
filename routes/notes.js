const express = require("express");
const router = express.Router();
const path = require("path");
router.get("/:id", (req, res, next) => {
  if (req.params.id.length >= 4 && req.params.id.length <= 14) {
    res.sendFile(path.join(__dirname, "../svelte/public/index.html"));
    curUser = req.params.id;
    console.log(clients.length);
  } else {
    res.send(
      "<center><h1>Error:INVALID_NUM_OF_LETTERS<br>PLEASE USE 4 OR MORE LETTERS<br> (LESS THAN OR EQUAL TO 14)<h1><p>korach ekka effort edukkam ketto<br>•́  ‿ ,•̀<p><center>"
    );
  }
});
module.exports = router;
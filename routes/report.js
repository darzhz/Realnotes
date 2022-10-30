const express = require("express");
const bodyParser =  require("body-parser");
const router = express.Router();
const path = require("path");
router.use(bodyParser.json());
router.post("/", async (req, res) => {
  let data = await req.body;
  let message =`bug report from ${data.name}@${data.id} that ${data.desc}`;
   tele.telegram.sendMessage(
    process.env.TUID,message
  );
  res.end();
});
module.exports = router;
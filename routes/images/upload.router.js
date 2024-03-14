const express = require("express");
const router = express.Router({ mergeParams: true });

const fileMulter = require("../../middleware/upload");

router.post("/image", fileMulter.single("file"), async (req, res) => {
  if (req.file) {
    var { path } = req.file;
    res.json({ path });
  }
});

module.exports = router;

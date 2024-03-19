var express = require("express");
var router = express.Router({ mergeParams: true });

var fileMulter = require("../../middleware/upload");

router.post("/image", fileMulter.single("file"), async (req, res) => {
  if (req.file) {
    var { path } = req.file;
    res.json({ path });
  }
});

module.exports = router;

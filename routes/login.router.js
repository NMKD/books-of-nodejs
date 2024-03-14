const express = require("express");
const router = express.Router({ mergeParams: true });

router.post("/login", async (req, res) => {
  try {
    res.status(201);
    res.json({ id: "1", mail: "test@mail.ru" });
  } catch (error) {
    console.log(error);
    res.json({ err: error.message });
  }
});

module.exports = router;

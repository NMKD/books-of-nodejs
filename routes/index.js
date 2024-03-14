const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/user", require("./login.router"));
router.use("/books", require("./books/books.router"));
router.use("/upload", require("./images/upload.router"));

module.exports = router;

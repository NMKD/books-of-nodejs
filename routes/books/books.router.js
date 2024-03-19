var express = require("express");
var router = express.Router({ mergeParams: true });
var { v4: uuid } = require("uuid");
var { Books } = require("../../constructors/bookClass");

var store = {
  books: [
    new Books(
      (id = 1),
      (title = "Величайшие математические задачи"),
      (description = "Загадочные числа, теоремы и гипотезы"),
      (authors = "Иэн Стюард"),
      (favorite = ""),
      (fileCover = ""),
      (fileName = "")
    ),
  ],
};
var { books } = store;

router.get("/", async (req, res) => {
  try {
    books.length > 0 ? res.json(books) : res.json({ data: "store is empty" });
  } catch (error) {
    console.error(error);
    res.json({ err: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const book = books.find((item) => item.id === Number(id));
      if (book) {
        return res.json(book);
      }
      res.status(404);
      return res.json({ error: "Not Found" });
    }
  } catch (error) {
    console.log(error);
    res.json({ err: error.message });
  }
});

// to create a book
router.post("/", async (req, res) => {
  try {
    if (Object.keys(req.body).length > 0) {
      if ([...books].findIndex((title) => req.body.title === title) == -1) {
        const book = {
          ...req.body,
          id: uuid(),
          favorite: "",
          fileCover: "",
          fileName: "",
        };
        books.push(book);
        res.status(201);
        return res.json(book);
      }
      return res.json({ error: "The book was created" });
    }
    return res.json({ error: "Request body is empty" });
  } catch (error) {
    console.log(error);
    res.json({ err: error.message });
  }
});

// To change the book
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (id && Object.keys(req.body).length > 0) {
      let book = books.find((item) => item.id === Number(id));
      if (!book) {
        res.status(404);
        return res.json({
          error: "The book not found",
        });
      }
      return res.json({
        ...book,
        ...req.body,
      });
    }
    return res.json({
      error: "Request body is empty or Request of params is empty",
    });
  } catch (error) {
    console.log(error);
    res.json({ err: error.message });
  }
});

// To delete the book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      let index = books.findIndex((item) => item.id === Number(id));
      if (index == -1) {
        res.status(404);
        return res.json({
          error: "The book not found",
        });
      }
      books.splice(index, 1);
      return res.json({ message: "the book was removed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ err: error.message });
  }
});

module.exports = router;

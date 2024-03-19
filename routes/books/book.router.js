var express = require("express");
var router = express.Router({ mergeParams: true });
var _ = require("lodash");
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

// Создание книги - форма render tamplates
router.get("/create", (req, res) => {
  res.render("books/create", {
    title: "Добавить книгу в библиотеку",
    book: {},
  });
});

// Задаем маршрут для редактирования книги - render tamplates
router.get("/update/:id", (req, res) => {
  try {
    if (_.isEmpty(req.params)) return res.json({ err: "Params is empty" });
    const { id } = req.params;
    if (id) {
      let index = books.findIndex((item) => item.id === Number(id));
      if (index == -1) {
        res.status(404);
        return res.json({
          error: "The book not found",
        });
      }
      res.render("books/update", {
        title: "Редактирование информации о книге",
        book: books[index],
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ err: error.message });
  }
});

module.exports = router;

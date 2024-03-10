var express = require("express");
var { v4: uuid } = require("uuid");
const { Books } = require("./constructors/bookClass");
var port = 3000;
var host = "127.0.0.1";

var app = express();
app.use(express.json());

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
// Api Login
app.post("/api/user/login", (req, res) => {
  try {
    res.status(201);
    res.json({ id: 1, mail: "test@mail.ru" });
  } catch (error) {
    console.log(error);
    res.json({ err: error.message });
  }
});

// Api Books
app.get("/api/books", (req, res) => {
  try {
    res.json(books);
  } catch (error) {
    console.log(error);
    res.json({ err: error.message });
  }
});

// find one book of all
app.get("/api/books/:id", (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      return res.json([...books].find((item) => item.id === Number(id)));
    }
    res.status(404);
    return res.json({ error: "Not Found" });
  } catch (error) {
    console.log(error);
    res.json({ err: error.message });
  }
});

// to create a book
app.post("/api/books", (req, res) => {
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
app.put("/api/books/:id", (req, res) => {
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
        ...req.body,
        ...book,
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
app.delete("/api/books/:id", (req, res) => {
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

app.listen(port, host, function () {
  console.log(`Server listens http://${host}:${port}`);
});

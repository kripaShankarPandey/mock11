const express = require("express");
const BookModel = require("../model/book.model");
const authMiddleware = require("../middleware/auth.middleware");
const checkAdminMiddleware = require("../middleware/checkAdmin.middleware");
const bookRouter = express.Router();
//Posting books to DB

bookRouter.post(
  "/api/books",
  authMiddleware,
  checkAdminMiddleware,
  async (req, res) => {
    const { title, author, category, price, quantity } = req.body;
    try {
      const bookdata = new BookModel({
        title,
        author,
        category,
        price,
        quantity,
      });
      await bookdata.save();
      res.status(201).send({ msg: "Book added to db Sucessfully" });
    } catch (e) {
      res.status(400).send({ msg: e.messgae });
    }
  }
);
//Getting all books from DB

bookRouter.get("/api/books", async (req, res) => {
  const { author, category } = req.query;
  try {
    if (category && !author) {
      const books = await BookModel.find({ category });
      res.status(200).send(books);
    } else if (author && category) {
      const books = await BookModel.find({
        $and: [{ author: author }, { category: category }],
      });
      res.status(200).send(books);
    } else {
      const books = await BookModel.find();
      res.status(200).send(books);
    }
  } catch (e) {
    res.status(400).send({ msg: e.messgae });
  }
});
//Getting books by ID DB

bookRouter.get("/api/books/:id", async (req, res) => {
  const { id } = req.params;
  let _id = id;
  try {
    if (id) {
      const books = await BookModel.findById({ _id });
      res.status(200).send(books);
    }
  } catch (e) {
    res.status(400).send({ msg: e.messgae });
  }
});
//Deleteing books from DB by ID

bookRouter.delete(
  "/api/books/:id",
  authMiddleware,
  checkAdminMiddleware,
  async (req, res) => {
    const { id } = req.params;
    let _id = id;
    try {
      if (id) {
        const books = await BookModel.findByIdAndDelete({ _id });
        res.status(202).send({ msg: "Books deleted sucssfully", books });
      }
    } catch (e) {
      res.status(400).send({ msg: e.messgae });
    }
  }
);

//Updating books to DB

bookRouter.patch(
  "/api/books/:id",
  authMiddleware,
  checkAdminMiddleware,
  async (req, res) => {
    console.log(req.params.id, { ...req.body }, "ll");
    const _id = req.params.id;
    try {
      await BookModel.findByIdAndUpdate(_id, { ...req.body });
      res.status(204).send({ msg: "Book updated Sucessfully", bookdata });
    } catch (e) {
      res.status(400).send({ msg: "Sucessfully" });
    }
  }
);
module.exports = bookRouter;

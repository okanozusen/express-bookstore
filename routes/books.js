const express = require("express");
const Book = require("../models/book");
const validate = require("../middleware/validate");
const bookSchema = require("../schemas/bookSchema");

const router = new express.Router();

/** GET / => {books: [book, ...]}  */
router.get("/", async (req, res, next) => {
  try {
    const books = await Book.findAll(req.query);
    return res.json({ books });
  } catch (err) {
    return next(err);
  }
});

/** GET /[isbn]  => {book: book} */
router.get("/:isbn", async (req, res, next) => {
  try {
    const book = await Book.findOne(req.params.isbn);
    if (!book) throw new NotFoundError("Book not found");
    return res.json({ book });
  } catch (err) {
    return next(err);
  }
});

/** POST /   bookData => {book: newBook} */
router.post("/", validate(bookSchema), async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    return res.status(201).json({ book });
  } catch (err) {
    return next(err);
  }
});

/** PUT /[isbn]   bookData => {book: updatedBook} */
router.put("/:isbn", validate(bookSchema), async (req, res, next) => {
  try {
    const book = await Book.update(req.params.isbn, req.body);
    if (!book) throw new NotFoundError("Book not found");
    return res.json({ book });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[isbn]   => {message: "Book deleted"} */
router.delete("/:isbn", async (req, res, next) => {
  try {
    await Book.remove(req.params.isbn);
    return res.json({ message: "Book deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

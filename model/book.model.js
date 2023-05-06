const mongoose = require("mongoose");
const { Schema } = mongoose;
const bookSchema = new Schema({
  title: String,
  author: String,
  category: String,
  price: Number,
  quantity: Number,
});
const BookModel = mongoose.model("book", bookSchema);
module.exports = BookModel;

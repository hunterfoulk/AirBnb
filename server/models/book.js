const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  genre: {
    type: String,
    trim: true,
  },
  authorId: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Book", bookSchema);

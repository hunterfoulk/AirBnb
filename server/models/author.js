const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  age: {
    type: Number,
    trim: true,
  },
  books: {
    type: Array,
    trim: true,
  },
});

module.exports = mongoose.model("Author", authorSchema);

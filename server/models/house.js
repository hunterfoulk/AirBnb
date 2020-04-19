const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const houseSchema = new Schema({
  location: {
    type: String,
    trim: true,
  },
  beds: {
    type: String,
    trim: true,
  },
  baths: {
    type: String,
    trim: true,
  },
  price: {
    type: String,
    trim: true,
  },
  owner: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("House", houseSchema);

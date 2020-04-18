const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ownerSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  age: {
    type: String,
    trim: true,
  },
  rating: {
    type: Number,
    trim: true,
  },
  houses: {
    type: Array,
    trim: true,
  },
});

module.exports = mongoose.model("Owner", ownerSchema);

var mongoose = require("mongoose");

const spaSchema = new mongoose.Schema({
  imgUrl: String,
  name: String,
  details: String,
 benefits: String,
});

const Spa = mongoose.model("Spa", spaSchema);
module.exports = Spa;

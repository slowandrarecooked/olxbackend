const mongoose = require("mongoose");
require("dotenv").config();
const connection = mongoose.connect(`${process.env.MONGOURL}/olx`);

module.exports = {
  connection,
};

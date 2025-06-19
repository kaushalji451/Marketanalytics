const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectdb = () => {
  try {
    mongoose.connect(process.env.MONGODB_URL).then(() => {
      console.log("mongodb is connected");
    });
  } catch {
    console.log("there is some error");
  }
};
module.exports = connectdb;

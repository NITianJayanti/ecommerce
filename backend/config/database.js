const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((data) => console.log("Connected to MongoDB"));
};

module.exports = connectDB;

const mongoose = require("mongoose");

connectTODb = () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.MONGODB).then(() => {
  // mongoose.connect('mongodb://localhost:27017/').then(() => {
    console.log("successfully connected to database",process.env.MONGODB);
  });
};

module.exports = connectTODb;

const mongoose = require("mongoose");

connectTODb = () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.MONGODB).then(() => {
    console.log("successfully connected to database");
  });
};

module.exports = connectTODb;

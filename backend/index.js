const express = require('express')
const cors=require('cors')
const app=express()
const port =  process.env.PORT || 5000
const connectTODb = require("./db");

//environment variable
require('dotenv').config()

//connecting to db
connectTODb();

// midelware
app.use(express.json());
app.use(cors());

//Available routes
app.use("/api/user", require("./routes/userRoute"));
// app.use("/api/notes", require("./routes/notesroutes"));

//listen
app.listen(port, () => {
  console.log(`app successfully running on port ${port}`);
});
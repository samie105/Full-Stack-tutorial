const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const todoRoute = require("./routes/todoRoute");
const userRoute = require("./routes/userRoute");

const app = express();
app.use(express.json());
const corsOptions = {
  origin: "https://todoapperr.netlify.app",
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use("/api/todos", todoRoute);
app.use("/api/users", userRoute);

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    app.listen(4000, () => {
      console.log("listening on port", 4000, " & connected to db");
    });
  })
  .catch((error) => console.log(error));

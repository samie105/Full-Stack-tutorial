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
};

app.use(cors(corsOptions));
app.use("/api/todos", todoRoute);
app.use("/api/users", userRoute);

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("listening on port", process.env.PORT, " & connected to db");
    });
  })
  .catch((error) => console.log(error));

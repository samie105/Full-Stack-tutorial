const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const todoRoute = require("./routes/todoRoute");
const userRoute = require("./routes/userRoute");
const corsOptions = {
  origin: "https://todoapperr.netlify.app",
};

app.use(cors(corsOptions));

const app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
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

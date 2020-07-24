const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//import route
const UserRoute = require("./src/routes/user");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

//connect mongodb
mongoose.connect("mongodb://localhost/user-express-mongodb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.json("Express api with mongodb");
});

app.use("/user", UserRoute);

app.listen(3000, () => {
  console.log("Server is running...");
});

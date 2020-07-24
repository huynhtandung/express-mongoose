const express = require("express");
const User = require("../models/user");

const userRouter = express.Router();

userRouter
  .get("/", (req, res) => {
    User.find({}, (err, users) => {
      if (err) {
        res.send(err);
      }
      res.json(users);
    });
  })
  .get("/:id", async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    res.json(user);
  })
  .post("/", (req, res) => {
    const data = req.body;
    const newUser = new User({
      name: data.name,
      age: data.age,
    });
    newUser
      .save()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.send(err);
      });
  })
  .put("/:id", async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const { name, age } = data;
    const user = await User.findById(id);

    if (!user) {
      res.statusCode(404).send("User not found");
    }
    name && (user.name = name);
    age && (user.age = age);
    user.save().then((data) => {
      res.json(data);
    });
  })
  .delete("/:id", async (req, res) => {
    const id = req.params.id;
    const user = User.findById(id);
    if (!user) {
      res.send("User not found");
    }
    user.remove().then((data) => {
      res.json(data);
    });
  });
module.exports = userRouter;

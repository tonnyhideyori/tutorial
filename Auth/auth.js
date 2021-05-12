const express = require("express");
const bcrypt = require("bcrypt");
const { User, validate } = require("../model/user");
const route = express.Router();
//registration route
route.post("/app/signup", async (req, res) => {
  //validate user input
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  let user = await User.findOne({ name: req.body.name });
  if (user) {
    res.status(404).send("user already exists. signin or choose another name");
    return;
  }
  user = new User({
    name: req.body.name,
    password: req.body.password
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  const token = user.AuthToken();
  await user.save();
  res.header("token",token).send({ name: user.name, id: user._id });
});
route.post("/app/signin", async (req, res) => {
  //validate user input
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  //checking if user exists in the database
  const user = await User.findOne({ name: req.body.name });
  if (!user) {
    res.status(404).send("invalid password or username");
    return;
  }
  //validating the password provided by user with one existing in the database
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    res.status(404).send("invalid password or username");
    return;
  }
  //generate jwt
  const token = user.AuthToken();
  //send a response
  res.header("token",token).send({ name: user.name, id: user._id });
});
module.exports = route;

const express = require("express");
const auth = require("../middleware/authmiddle");
const route = express.Router();

route.get("/app/secret", auth, (req, res) => {
  res.send("if you see this it means your logged in and provide access token");
});
module.exports = route;

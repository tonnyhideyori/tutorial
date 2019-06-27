const jwt = require("jsonwebtoken");
const keys = require("../keys/key");

module.exports = function auth(req, res, next) {
  const token = req.header("token");
  //verifying if user provide a token
  if (!token) {
    res.status(401).send("Access denied! provide auth token");
    return;
  }
  //try and catch block verify if the provided token is valid or not
  try {
    const decodedUser = jwt.verify(token, keys.jwtPrivate);
    req.user = decodedUser;
    next();
  } catch (e) {
    res.status(404).send("invalid token!");
    return;
  }
};

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const auth = require("./Auth/auth");
const secret = require("./Auth/secret");
//connecting to mongodb
mongoose
  .connect("mongodb://mongo:27017/Fullstack", { useNewUrlParser: true })
  .then(console.log("connected to mongodb"))
  .catch(err => console.error(`not connected to mongodb ${err}`));
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//allowing cross origin resource sharing this is handy when integrating backend with frontend
app.use(cors());
//authentication and registartion route
app.use("/", auth);
//protected route
app.use("/", secret);
//creating a port and listen to it
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("listening at port 5000");
});

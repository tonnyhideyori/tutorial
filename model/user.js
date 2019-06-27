//create user model
const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const keys = require("../keys/key");
//creating a user schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, minlength: 3 },
    password: { type: String, required: true }
  },
  { timestamps: true }
);
//add authentication function in a user schema
userSchema.methods.AuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id
    },
    keys.jwtPrivate
  );
  return token;
};
//create user collection in database
const User = mongoose.model("user", userSchema);

//function validating user input before persisted in database
function validate(user) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    password: Joi.string().required()
  };
  return Joi.validate(user, schema);
}
exports.User = User;
exports.validate = validate;

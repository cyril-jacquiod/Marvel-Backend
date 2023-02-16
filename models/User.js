const mongoose = require("mongoose");

const User = mongoose.model("User", {
  username: String,
  email: String,
  description: String,
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;

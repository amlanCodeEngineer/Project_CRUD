const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  imageURL: { type: String, default: "" },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);

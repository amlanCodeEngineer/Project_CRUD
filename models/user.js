const mongoose = require("mongoose");

// Use environment variable if available, otherwise use local DB
const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/testapp1";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
  imageURL: { type: String, default: "" },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);

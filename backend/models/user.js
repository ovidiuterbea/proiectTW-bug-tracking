const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  image: { type: String, required: true },
  projects: [
    { type: mongoose.Types.ObjectId, required: false, ref: "Project" },
  ],
});

module.exports = mongoose.model("User", userSchema);

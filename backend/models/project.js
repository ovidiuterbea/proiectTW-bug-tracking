const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: { type: String, required: true },
  repo: { type: String, required: true },
  users: [{ type: mongoose.Types.ObjectId, required: true, ref: "User" }],
  bugs: [
    {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "Bug",
    },
  ],
});

module.exports = mongoose.model("Project", projectSchema);

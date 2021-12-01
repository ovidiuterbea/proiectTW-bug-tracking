const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const bugSchema = new Schema({
  severity: { type: String, required: true }, // low, minor, major, critical, blocker
  description: { type: String, required: true }, // descriptia bug-ului
  priority: { type: String, required: true }, // prioritatea: Low, Medium, High
  commit: { type: String, required: true }, // link-ul
  status: { type: String, required: true }, // resolved sau unresolved
  project: { type: mongoose.Types.ObjectId, required: true, ref: "Project" },
});

bugSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Bug", bugSchema);

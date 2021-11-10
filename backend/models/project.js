const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: { type: String, required: true },
  repo: { type: String, required: true },
  participants: [
    { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  ],
  bugs: [
    {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "Bug",
    },
  ],
});

projectSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Project", projectSchema);

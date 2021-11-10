const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const bugSchema = new Schema({
  severity: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, required: true },
  commit: { type: String, required: true },
});

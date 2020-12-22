// Model for the Debate Title Metadata Documents for each Book //

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DebateTitleSchema = new Schema({
  name_eng: {
    type: String, // Debate Title in English
    required: true,
  },
  name_kan: {
    type: String, // Debate Title in Kannada
    required: true,
  },
  modified_user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  last_modified_time: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

module.exports = DebateTitleSubject = mongoose.model(
  "debatetitle",
  DebateTitleSchema
);

// debate_title_eng	Debate Title Name in English
// debate_title_kan	Debate Title Name in Kannada
// modified_time	Modifed Time of the Form
// modified_user	Modified User details based on JWT Token

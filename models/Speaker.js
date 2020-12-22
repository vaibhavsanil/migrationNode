// Model for the Speaker Name Documents for each Book //

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SpeakerSchema = new Schema({
  name_eng: {
    type: String, // Speaker Name in English
    required: true,
  },
  name_kan: {
    type: String, // Speaker Name in Kannada
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

module.exports = SpeakerName = mongoose.model("speakername", SpeakerSchema);

// debate_title_eng	Debate Title Name in English
// debate_title_kan	Debate Title Name in Kannada
// modified_time	Modifed Time of the Form
// modified_user	Modified User details based on JWT Token

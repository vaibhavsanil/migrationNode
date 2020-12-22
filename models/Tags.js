//  The Collection of tags for each section

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagsSchema = new Schema({
  name_eng: {
    type: String, // Issue Title in English
    required: true,
  },
  name_kan: {
    type: String, // Issue Title in Kannada
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

module.exports = TagsModel = mongoose.model("tags", TagsSchema);

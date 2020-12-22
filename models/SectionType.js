// The Collection is about Sectional Metadata Model //

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SectionalTypeMetadataSchema = new Schema({
  sectiontypetitleeng: {
    type: String,
  },
  sectiontypetitlekan: {
    type: String,
  },
  modified_user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  modified_time: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Boolean,
  },
});

module.exports = SectionTypeBook = mongoose.model(
  "sectionaltypebook",
  SectionalTypeMetadataSchema
);

// Model for the Annexure Documents for each Book //

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnnexureSchema = new Schema({
  book_id: {
    type: Schema.Types.ObjectId, // DOUBT WHETHER TO CREATE BOOK ID ,REFER TO THE STRUCTURE OF THE BOOK
    ref: "structbook",
  },
  migrateId: {
    type: Number, /// This id will be using fr migration from the mongo database
    unique: true,
  },
  book_id_num: {
    type: Number,
    required: true, // DOUBT WHETHER TO CREATE BOOK ID ,REFER TO THE STRUCTURE OF THE BOOK
  },
  annexure_title: {
    type: String,
    trim: true,
    required: true,
  },
  start_page: {
    type: Number,
    required: true,
  },
  end_page: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  annexure_file_path: {
    type: String, // File Path Extension where the annexure file will be served
  },
  modified_user: {
    type: Schema.Types.ObjectId, // refering to the Users Schema to the user who have changed the document
    ref: "users",
  },
  last_modified_time: {
    type: Date, // Modified time by the above user
    default: Date.now,
  },
});
module.exports = Annexure = mongoose.model("annexure", AnnexureSchema);

// done annexure_title	Title of the Annexure
// done  start_page
// done end_page
//  done modified_user
// done  modified_time

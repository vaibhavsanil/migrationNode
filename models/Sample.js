//  The collection will have information about the Structural Metadata of the Books ///

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SampleSchema = new Schema({
  _id: {
    type: String,
    default: "book_id",
  },

  sequence_value: {
    type: Number,
  },
});

module.exports = Sample = mongoose.model("sample", SampleSchema);

// done bookId	Will be auto generated based on the previous number & will not be saved to the database till saved
// done  assemblynum	Assembly Number of the Book
// done session num	Session Number of the book
// done volumenum	Volume Number of the book
// done partnum	Part Number of the Book
// done numofpages	Number of Pages in the Book
// done place	Place of Session
// done year	Year in the Book
// done datesofsession	an array of Dates ,minimum One
// done Status	Status of the Book[UPLOADED,OCR'ed,PDF's GENERATED,INDEXED,CREATED]
// done binding_status	An array of [BOOK NOT GIVEN,UNBINDED,BINDED,RETURNED]
// done book_returned_date	date
// done modified_user	user who created the book
// done modified_time	last modified time
// done metadata_kla_given_date	Metadata Format Date given by the KLA
// done metadata_start_date	Metadata Start Date by our Data Entry Operator
// done Metadata_end_date	Metadata Finished Dateby our Data Entry Operator
//  done path_full_pdf	Full Path to the PDF
// done book_uploaded_date
// done Annexure	An Array of Annexure Model refer to Annexure Model
// done OCR_PAGES_TEXT	[[1,["Text"]]]

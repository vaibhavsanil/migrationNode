//  The collection will have information about the Structural Metadata of the Books ///

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Imported Schema & Models
const OCRSchema = require("./schema/OCR_PAGES_SCHEMA");
const Sample = require("./Sample");

function geotValueForNextSequence(sequenceOfName) {
  Sample.findById({ _id: sequenceOfName })
    .then((doc) => {
      if (doc) {
        var sequenceDoc = Sample.findAndModify({
          query: { _id: sequenceOfName },
          update: { $inc: { sequence_value: 1 } },
          new: true,
        });
        console.log(
          "[DEBUG-SAMPLE] Counter for Book Id Incremented",
          sequenceDoc
        );
        return sequenceDoc.sequence_value;
      } else {
        var sample = new Sample({
          sequence_value: 0,
        });

        sample
          .save()
          .then((doc) => {
            console.log(
              "[DEBUG-SAMPLE] Initalized the Counter for Book Id",
              doc
            );
            return doc.sequence_value;
          })
          .catch((err) => {
            console.log(
              "[ERROR-DEBUG-SAMPLE] Initalized the Counter for Book Id",
              err
            );
          });
      }
    })
    .catch((err) => console.error("[ERROR-DEBUG-SAMPLE] ", err));
}

const StructBookSchema = new Schema({
  bookId: {
    type: Number, /// Doubt We have to auto increment the id apart from the Object id
    //  required: true,
    unique: true,
  },
  migrateId: {
    type: String, /// This id will be using fr migration from the mongo database
    unique: true,
  },
  assembly_number: {
    type: Number, // Denotes the assembly number of the session
    required: true,
  },
  session_number: {
    type: Number, // Denotes the session number of the ongoing session
    required: true,
  },
  volume_number: {
    type: Number, // Volume Number of the Book
  },
  part_number: {
    type: Number, // Part Number of the Book
  },
  numofpages: {
    type: Number, // Number of Pages in the book
    required: true,
  },
  place_session: {
    type: String, // Doubt Place of Sessionw will be a pull down between [Bangalore,Belegavi]
    required: true,
  },
  year_book: {
    type: Number, // DOUBT Year of the Book will be the pull down menu of all the years
    required: true,
  },
  //   book_section_flagged:[], ? We have link the Structure of Book Schema
  //to current Schema & Number of Mistakes can be captured in current Schema

  dates_session: [
    {
      type: String, // DOUBT Dates will be an array of dates which can be one or multiple
      required: true,
    },
  ],

  status_of_books: {
    type: String, //DOUBT Status of the Book[UPLOADED,OCR'ed,PDF's GENERATED,INDEXED,CREATED,LIVE]
    default: "Book Created",
  },

  binding_status: {
    type: Boolean, // binding_status	An array of [BOOK NOT GIVEN,UNBINDED,BINDED,RETURNED]
    default: false,
  },
  book_returned_date: {
    type: Date, // Return of the book
  },
  modified_user: {
    type: Schema.Types.ObjectId, // refering to the Users Schema to the user who have changed the document
    ref: "users",
  },
  last_modified_time: {
    type: Date, // Modified time by the above user
    default: Date.now,
  },
  metadata_given_date: {
    type: Date, // Metadata File given by the KLAS
  },
  metadata_start_date: {
    type: Date, // Metadata Start Date by our Data Entry Operators
  },

  metadata_end_date: {
    type: Date, // Metadata End Date by our Data Entry Operators
  },

  path_full_pdf: {
    type: String, // DOUBT Path to the Full PDF of the Book
  },

  book_uploaded_date: {
    type: Date, // Book Uploaded Date by the User
  },
  remarksBook: {
    type: String, // Capture the Remarks on the Book
  },

  annexure: [
    {
      type: Schema.Types.ObjectId, // Refer to the Annexure Model for the annexures in the book
      ref: "annexure",
    },
  ],

  OCR_PAGES_TEXT: [OCRSchema], //OCR_PAGES_TEXT	[[1,["Text"]]] datastructure efficient
  sectionsbook: [
    {
      type: Schema.Types.ObjectId, // Refering to Sectional Book Model
      ref: "sectionalbook",
    },
  ],
  status_metadata_book: {
    type: Boolean, //[TODO] Status of the book completed or not
    default: false,
  },
});

// StructBookSchema.pre("save", function (next) {
//   var document = this;
//   sequenceOfName = "book_id";
//   Sample.find({ _id: sequenceOfName })
//     .then((doc) => {
//       if (doc.length !== 0) {
//         Sample.findOneAndUpdate(
//           { _id: sequenceOfName },
//           { $inc: { sequence_value: 1 } },
//           {
//             new: true,
//           }
//         )
//           .then((updatedSequence) => {
//             // Return the Book Id of the Document
//             document.bookId = updatedSequence.sequence_value;

//             next();
//           })

//           .catch((err) => {
//             next(err);
//           });
//       } else {
//         var sample = new Sample({
//           sequence_value: 1,
//         });

//         sample
//           .save()
//           .then((doc) => {
//             // Return the Book Id of the Document
//             document.bookId = doc.sequence_value;
//             //return doc.sequence_value;
//             next();
//           })
//           .catch((err) => {
//             next(err);
//           });
//       }
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

module.exports = StructureBook = mongoose.model("structbook", StructBookSchema);

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

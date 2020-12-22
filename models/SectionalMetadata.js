// The Collection is about Sectional Metadata Model //
// https://stackoverflow.com/questions/26526779/mongoose-populate-not-working
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SectionalMetadataSchema = new Schema({
  struct_id: {
    type: Schema.Types.ObjectId, // DOUBT Whether we have to keep two reference or one is enough
    ref: "structbook",
  },
  migrateId: {
    type: String, /// This id will be using fr migration from the mongo database
    unique: true,
  },
  book_id: {
    type: Number, // refer to the model Structural Book ID a
    required: true,
  },
  // section_type: {
  //   type: Schema.Types.ObjectId, // DOUBT Pull Down Menu PART1[Question & Answers] & PART2[OTHER THAN QUESTION AND ANSWERS]
  //   ref: "sectionaltypebook",
  //   required: true,
  // },
  section_type: {
    type: String, // DOUBT Pull Down Menu PART1[Question & Answers] & PART2[OTHER THAN QUESTION AND ANSWERS]
    required: true,
  },
  start_page: {
    type: Number, // Start Page of the section
    required: true,
  },
  end_page: {
    type: Number, // End Page of the section
    required: true,
  },
  debate_title_subject: {
    type: Schema.Types.ObjectId, //DOUBT Refer to the debatesubject model
    ref: "debatetitle",
  },
  debate_subject_eng: {
    type: String,
  },
  debate_subject_kan: {
    type: String,
    required: true,
  },
  issues_section: [
    {
      type: Schema.Types.ObjectId, // Refer to the issues model
      ref: "issues",
    },
  ],
  tags_array: [
    {
      type: Schema.Types.ObjectId, // Refer to the tags model
      ref: "tags",
    },
  ],

  debate_section_date: {
    type: Date,
    trim: true,
  },
  question_number: {
    type: Number, // The Question Number of the PART1 Question & Answers
  },
  questioner_name: {
    type: Schema.Types.ObjectId, // Refer to the member participants model
    ref: "memberparticipant", // The Question Number of the PART1 Question & Answers
  },
  minister_name: {
    type: Schema.Types.ObjectId, // Refer to the member participants model
    ref: "memberparticipant",
  },
  minister_portfolio: {
    type: Schema.Types.ObjectId, // Refer to the Ministers Portofolio
    ref: "ministryportfolio",
  },
  annexure: [
    {
      type: Schema.Types.ObjectId, // DOUBT Refer to the Annexure Model in
      ref: "annexure",
    },
  ],

  debate_participants: [
    {
      type: Schema.Types.ObjectId, // An array of members  Refer to the member participants model
      ref: "memberparticipant",
    },
  ],

  path_pdf: {
    type: String, // Default path of the sectional pdf generated in file serving directory
  },
  modified_user: {
    type: Schema.Types.ObjectId, // Modified user name
    ref: "users",
  },

  modified_time: {
    type: Date, // Modified time
    default: Date.now,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

module.exports = StructureBook = mongoose.model(
  "sectionalbook",
  SectionalMetadataSchema
);

// DONEstruct_book_id	Refer to the Strucutral Metadata Model
// done section_type	PART1/PART2
// done start_page	Starting of the section page
// done end_page	End of Section Page
// done debate_subject	Ref to the House Participants Model
// done debate_title
// done issues
// done tags
// done dates
// done QuestionNumber
// done Questioner	Ref Debate Particiapants
// done Minister	Ref Debate Particiapants
// done Portfolio	Refer to Ministry Model
// done Annexure	an array of annexure refer to the Structural Metadata
// done Debate_participants	Debate Participants
// done path_pdf
// done modified_user
// done modified_date

//TODO ---
// done 1 Design to debatesubject model done
// done 2 Design Tags Model
// done Design  issues model
// done 3 Design Member Participants model
// done Design Ministers Portfolio

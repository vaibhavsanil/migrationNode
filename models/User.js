const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  admin_status: {
    type: Boolean,
    required: true,
    default: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  joining_date: {
    type: Date,
    default: Date.now,
  },
  date_of_leaving: {
    type: Date,
  },
  number_books_completed: {
    type: Number, // Can we have virtual count property on this value based on book_sections_completed
  },
  book_sections_completed: [
    {
      type: Schema.Types.ObjectId, // Book Completed by the User link to Structural Book Collection
      ref: "structbook",
    },
  ],
  book_section_flagged: [
    {
      type: Schema.Types.ObjectId,
      ref: "sectionalbook",
    },
  ], //? We have link the Structure of Book Schema
  //to current Schema & Number of Mistakes can be captured in current Schema
  //Should we add status to the corrected Schema or we have to create seperate schema

  modified_date: {
    type: Date,
    default: Date.now,
  },

  status_user: {
    type: Boolean,
    default: true,
  },
});

module.exports = User = mongoose.model("users", UserSchema);

// User Schema

// books_section_flagged
// number_of_mistakes
// number_books_completed

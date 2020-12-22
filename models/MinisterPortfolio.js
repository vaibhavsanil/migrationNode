// The Collection of Ministry Portfolios

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MinisterPortfolioSchema = new Schema({
  name_eng: {
    type: String, // Debate Title in English
    required: true,
  },
  name_kan: {
    type: String, // Debate Title in Kannada
    required: true,
  },
  ministry_debate_questions: [
    {
      type: Schema.Types.ObjectId, // Refer to all the debates they have particiapted
      ref: "sectionalbook",
    },
  ],
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

module.exports = MinistryPortfolio = mongoose.model(
  "ministryportfolio",
  MinisterPortfolioSchema
);

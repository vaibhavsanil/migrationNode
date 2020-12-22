//  Collection of the MLA's for KLA or of the MLC's for KLC

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MemberParticipantSchema = new Schema({
  name_eng: {
    type: String, // Debate Title in English
    required: true,
  },
  name_kan: {
    type: String, // Debate Title in Kannada
    required: true,
  },
  member_debate_participant: [
    {
      type: Schema.Types.ObjectId, // Refer to all the debates they have particiapted
      ref: "sectionalbook",
    },
  ],
  member_debate_questions: [
    {
      type: Schema.Types.ObjectId, // Doubt Can we filter all the question in the sectional model
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

module.exports = MemberParticipant = mongoose.model(
  "memberparticipant",
  MemberParticipantSchema
);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OCRPagesSchema = new Schema({
  page_number: Number,
  ocr_text: String,
  //user: { type: Schema.Types.ObjectId, ref: "user" },
});

// const OCRPages = mongoose.model("ocrpages", OCRPagesSchema);

module.exports = OCRPagesSchema;

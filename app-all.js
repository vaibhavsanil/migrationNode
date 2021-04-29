// https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-18-04-source
// mongodb://127.0.0.1:27017

// https://www.reddit.com/r/reactjs/comments/kmj0wc/react_dashboard_5_free_modern_designs_for_2021/?%24deep_link=true&correlation_id=817bacad-547e-482e-a394-d6f42c2cf23f&ref=email_digest&ref_campaign=email_digest&ref_source=email&%243p=e_as&%24original_url=https%3A%2F%2Fwww.reddit.com%2Fr%2Freactjs%2Fcomments%2Fkmj0wc%2Freact_dashboard_5_free_modern_designs_for_2021%2F%3F%24deep_link%3Dtrue%26correlation_id%3D817bacad-547e-482e-a394-d6f42c2cf23f%26ref%3Demail_digest%26ref_campaign%3Demail_digest%26ref_source%3Demail&_branch_match_id=487322404780213368
//

const mongoose = require("mongoose");
const XLSX = require("xlsx");
const config = require("config");
const fs = require("fs");
//const os = require("os");
const path = require("path");

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set("useFindAndModify", false);

// Constants
const {
  getDebateTitleId,
  getIssuesField,
  getMembersDetails,
  getMinisterPortfolio,
  getMemberParticipants,
  getDateInIsoFormat,
  populateMetadata,
  populateStructuralMetadata,
  populateSectionalMetadata,
  populateAnnexureToDatabase,
} = require("./const");

// Debate Title Model
const DebateTitleModel = require("./models/DebateTitle");
const IssuesModel = require("./models/Issues");
const MembersModel = require("./models/MemberParticipant");
const PortfolioModel = require("./models/MinisterPortfolio");
const SpeakersModel = require("./models/Speaker");
const StructureBookModel = require("./models/StructureBook");
const SectionalBookModel = require("./models/SectionalMetadata");
const Annexure = require("./models/Annexure");

const args = process.args;

console.log("[ARGS] the value is ", args);

// Source Files for
const logFileSuccess =
  "/home/vaibhav/Documents/VidhanDocsTracker/populateDB/logs/logs-success.txt";

const logFileFail =
  "/home/vaibhav/Documents/VidhanDocsTracker/populateDB/logs/logs-error.txt";

const DEBATES_13_SRC =
  "/home/vaibhav/Documents/VidhanDocsTracker/populateDB/excelData/KLA/13/";

const DEBATES_12_SRC =
  "/home/vaibhav/Documents/VidhanDocsTracker/populateDB/excelData/KLA/12/";

const DEBATES_KLC_SRC =
  "/home/vaibhav/Documents/VidhanDocsTracker/populateDB/excelData/KLC/";

const ANNEXURE_KLA =
  "/home/vaibhav/Documents/VidhanDocsTracker/populateDB/excelAnnexures/KLA_NEW";

const ANNEXURE_KLC =
  "/home/vaibhav/Documents/VidhanDocsTracker/populateDB/excelAnnexures/KLC";

// Metadata Source
const metadata_src_kla =
  "/home/vaibhav/Documents/VidhanDocsTracker/populateDB/excelMetadata/KLA/";

const metadata_src_klc =
  "/home/vaibhav/Documents/VidhanDocsTracker/populateDB/excelMetadata/KLC/";

mongoose.Promise = global.Promise;

//DB Config
//Check if the APP Variable connects to KLA or KLC
const db = config.get("localMongoURI_KLA_OPS");
//console.log(db);

// Connect MongoDatabase
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

function readExcelFile(inputFile) {
  //https://github.com/SheetJS/sheetjs/issues/126
  //stackoverflow.com/questions/53163552/format-date-with-sheetjs
  console.log(`[FILE] The excel file is reading for ${inputFile}`);
  const workbook = XLSX.readFile(inputFile);
  var sheet_name_list = workbook.SheetNames;
  var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]], {
    //dateNF: "dd.MM.yyyy",
    // cellDates: true,
    // cellNF: false,
    // cellText: false,
  });
  //console.log("[DEBUG] from readExcelFile ", xlData);
  return xlData;
  //console.log(xlData);
}

function writeFileSyncSuccess(writeString, logfile) {
  fs.appendFile(logfile, writeString, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log(`[Success LOG WRITE] ${writeString}  was saved in logs`);
  });
}

function writeFileSyncError(writeString, logfile) {
  fs.appendFile(logfile, writeString, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log(`[Error LOG WRITE] ${writeString}  was saved in logs`);
  });
}

// Populate Metadate to database

//populateMetadata("debatetitle", metadata_src_klc);

//populateStructuralMetadata(DEBATES_12_SRC);
//https://blog.heroku.com/best-practices-nodejs-errors
// Basic Hacking
// https://www.youtube.com/watch?v=6vj96QetfTg&ab_channel=RSAConference
// Populate the Sectional Metadata
populateSectionalMetadata(DEBATES_12_SRC, "section");
//populateAnnexureToDatabase(ANNEXURE_KLC);

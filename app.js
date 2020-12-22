// https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-18-04-source
// mongodb://127.0.0.1:27017
const mongoose = require("mongoose");
const XLSX = require("xlsx");
const config = require("config");
const fs = require("fs");
//const os = require("os");
const path = require("path");

// Debate Title Model
const DebateTitleModel = require("./models/DebateTitle");
const IssuesModel = require("./models/Issues");
const MembersModel = require("./models/MemberParticipant");
const PortfolioModel = require("./models/MinisterPortfolio");
const SpeakersModel = require("./models/Speaker");

// Source Files for

const DEBATES_13_SRC =
  "/home/vaibhav/Documents/VidhanDocsTracker/populateDB/excelData/KLA/13/";

const DEBATES_12_SRC =
  "/home/vaibhav/Documents/VidhanDocsTracker/populateDB/excelData/KLA/12/";

// Metadata Source
const metadata_src_kla =
  "/home/vaibhav/Documents/VidhanDocsTracker/populateDB/excelMetadata/KLA/";

mongoose.Promise = global.Promise;

//DB Config
//Check if the APP Variable connects to KLA or KLC
const db = config.get("localMongoURI_KLA_OPS");
//console.log(db);

// Connect MongoDatabase
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

function readExcelFile(inputFile) {
  console.log(`[FILE] The excel file is reading for ${inputFile}`);
  const workbook = XLSX.readFile(inputFile);
  var sheet_name_list = workbook.SheetNames;
  var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  return xlData;
  //console.log(xlData);
}

// Populate Metadate to database

//populateMetadata("speakers", metadata_src_kla);

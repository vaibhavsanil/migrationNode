// https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-18-04-source
// mongodb://127.0.0.1:27017
const mongoose = require("mongoose");
const XLSX = require("xlsx");
const config = require("config");
const fs = require("fs");
//const os = require("os");
const path = require("path");

// Constants
const {
  getDebateTitleId,
  getIssuesField,
  getMembersDetails,
  getMinisterPortfolio,
  getMemberParticipants,
  getDateInIsoFormat,
} = require("./const");

// Debate Title Model
const DebateTitleModel = require("./models/DebateTitle");
const IssuesModel = require("./models/Issues");
const MembersModel = require("./models/MemberParticipant");
const PortfolioModel = require("./models/MinisterPortfolio");
const SpeakersModel = require("./models/Speaker");
const StructureBookModel = require("./models/StructureBook");
const SectionalBookModel = require("./models/SectionalMetadata");

const args = process.args;

console.log("[ARGS] the value is ", args);

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

// Populate Metadate to database

//populateMetadata("speakers", metadata_src_kla);

////////////////////// Populate Sectional Metadata //////////////////////

// { ID: 318882,
//   'Section Type': 'part1',
//   'Start Page': 212,
//   'End Page': 213,
//   Title: 'Unstarred Questions',
//   'Subject Kan': 'ದೇವಗಿರಿಯಿಂದ ಮೆಳ್ಳಾಗಟ್ಟಿಗೆ ಸೇತುವೆ ನಿರ್ಮಾಣದ ಬಗ್ಗೆ',
//   Issues: 'NA',
//   Dates: '22-07-2009',
//   'Question Number': 979,
//   Questioner: 'Neharu Chanabasappa Olekar',
//   Ministry: 'NA',
//   Minister: 'Udasi Channabasappa Mahalingappa',
//   Portfolio: 'Minister For Public Works',
//   Participants: 'NA' },

async function populateSectionalMetadata(srcDir, fileType, bookid) {
  // function to convert the string of dates to array of dates
  function changeDatesToArray(datesString) {
    let datesArray = datesString.split(",");
    return datesArray;
  }

  function replaceStringSpace(stringvalue) {
    //console.log("[DEBUG] Replace String ", stringvalue);
    if (typeof stringvalue === "string") {
      let res = stringvalue.replace(/\s+/g, "");
      return res;
    } else {
      let res = stringvalue.toString();
      let convertedString = res.replace(/\s+/g, "");
      return convertedString;
    }
  }

  function generateYear(dateArray) {
    let dateval = dateArray[0].split("-");
    let year = parseInt(dateval[2]);
    return year;
  }

  function getBookId(filenamestring) {
    bookIdString = filenamestring.split("_");
    bookid = parseInt(bookIdString[0]);
    return bookid;
  }

  files = fs.readdirSync(srcDir);

  function getFileByBookId(filesSearch, book, filetype) {
    var searchBook = book + "_" + filetype + ".xls";
    //   console.log("[DEBUG] the search book", searchBook);
    var indexOfFile = filesSearch.indexOf(searchBook);
    //  console.log("[DEBUG] the search index book", indexOfFile);

    return filesSearch[indexOfFile];
  }

  files_struct = files.filter((filenames) => {
    return filenames.includes(bookid + "_" + fileType);
  });

  console.log("[DEBUG] the file", getFileByBookId(files, bookid, fileType));
  // ////// Debug

  // files_struct.forEach((fileName) => {
  file_name_excel = path.join(srcDir, getFileByBookId(files, bookid, fileType));
  //   //console.log(file_name_excel);
  //console.log("[READING] reading excel file from ", file_name_excel);
  excel_response = readExcelFile(file_name_excel);
  //console.log("File Responses", excel_response);
  // Map through all the elements of the structural metadata
  //console.log("[DEBUG] The excel response ", excel_response);
  // excel_response.map(async (debatesection) => {
  for (var debatesectionid in excel_response) {
    debatesection = excel_response[debatesectionid];

    // Book 21
    // console.log("[DEBUG] The debate section ", debatesection);
    let sectionalMetadataFields = {};
    sectionalMetadataFields.migrateId = debatesection["ID"];
    sectionalMetadataFields.book_id = getBookId(
      getFileByBookId(files, bookid, fileType)
    );
    sectionalMetadataFields.section_type = debatesection["Section Type"];
    sectionalMetadataFields.start_page = debatesection["Start Page"];
    sectionalMetadataFields.end_page = debatesection["End Page"];
    // sectionalMetadataFields.debate_title_subject = getDebateTitleId(
    //   debatesection["Title"]
    // );
    sectionalMetadataFields.debate_title_subject = getDebateTitleId(
      debatesection["Title"]
    );

    if (debatesection.Issues !== "NA") {
      // console.log("[DEBUG] debate Issues ", debatesection.Issues);
      sectionalMetadataFields.issues_section = getIssuesField(
        debatesection["Issues"]
      );
    } else {
      sectionalMetadataFields.issues_section = [];
    }
    if (debatesection["Subject Eng"]) {
      sectionalMetadataFields.debate_subject_kan = debatesection["Subject Eng"];
    } else {
      sectionalMetadataFields.debate_subject_kan = debatesection["Subject Kan"];
    }

    sectionalMetadataFields.debate_section_date = getDateInIsoFormat(
      debatesection["Dates"],
      sectionalMetadataFields
    );

    if (debatesection["Annexure ID"])
      sectionalMetadataFields.annexure_migrate_id =
        debatesection["Annexure ID"];
    if (
      debatesection["Participants"] === "NA" ||
      debatesection["Participants"] === "" ||
      debatesection["Participants"] === null ||
      debatesection["Participants"] === undefined
    ) {
      sectionalMetadataFields.debate_participants = [];
    } else {
      try {
        sectionalMetadataFields.debate_participants = await getMemberParticipants(
          debatesection["Participants"]
        );
      } catch (error) {
        console.log(error);
      }
    }

    if (debatesection.Issues !== "NA") {
      //console.log("[DEBUG] debate Issues ", debatesection.Issues);
      Promise.all([sectionalMetadataFields.issues_section]).then(
        (value) => (sectionalMetadataFields.issues_section = value[0])
      );
    }

    if (debatesection["Section Type"] === "part1") {
      //console.log("[DEBUG] Sectional Type for Part 1");
      if (
        //debatesection["Question Number"] !== "NA" ||
        //debatesection["Question Number"] !== undefined
        "Question Number" in debatesection
      ) {
        if (debatesection["Question Number"] !== "NA") {
          sectionalMetadataFields.question_number =
            debatesection["Question Number"];
        } else {
          sectionalMetadataFields.question_number;
        }
      } else {
        sectionalMetadataFields.question_number;
      }
      if (debatesection["Minister"] !== "NA") {
        sectionalMetadataFields.minister_name = getMembersDetails(
          debatesection["Minister"],
          sectionalMetadataFields
        );
      }

      if (debatesection["Portfolio"] !== "NA") {
        sectionalMetadataFields.minister_portfolio = getMinisterPortfolio(
          debatesection["Portfolio"]
        );
      }

      if (debatesection["Questioner"] !== "NA") {
        sectionalMetadataFields.questioner_name = getMembersDetails(
          debatesection["Questioner"]
        );
      } else {
        sectionalMetadataFields.questioner_name;
      }
      Promise.all([
        sectionalMetadataFields.questioner_name,
        sectionalMetadataFields.minister_portfolio,
        sectionalMetadataFields.minister_name,
        sectionalMetadataFields.debate_title_subject,

        sectionalMetadataFields.debate_participants,
      ]).then(async (value) => {
        sectionalMetadataFields.questioner_name = value[0];
        sectionalMetadataFields.minister_portfolio = value[1];
        sectionalMetadataFields.minister_name = value[2];
        sectionalMetadataFields.debate_title_subject = value[3];
        sectionalMetadataFields.debate_participants = value[4];
        // console.log(
        //   "[DEBUG] Sectional Metadata Fields for Part 1 ",
        //   sectionalMetadataFields
        // );

        const newSectionBook = new SectionalBookModel(sectionalMetadataFields);

        try {
          const dbSave = await newSectionBook.save();
          Promise.all([dbSave])
            .then((value) => {
              console.log(
                "[SAVED] The new Book Structure  Migrated to local Mongo for Part 1 ",
                value[0]
              );
            })
            .catch((err) => {
              throw new Error(
                `[Error] occured while inserting ${sectionalMetadataFields.book_id} at section id ${sectionalMetadataFields.migrateId}  with the following error ${err}`
              );
              process.exit(1);
            });
        } catch (err) {
          throw new Error(
            `[Error] occured while inserting ${sectionalMetadataFields.book_id} at section id ${sectionalMetadataFields.migrateId}  with the following error ${err}`
          );
          process.exit();
        }

        // newSectionBook
        //   .save()
        //   .then((title) => {
        //     console.log(
        //       "[SAVED] The new Book Structure  Migrated to local Mongo for Part 1 ",
        //       title
        //     );
        //   })
        //   .catch((err) =>
        //     console.log("[ERROR] The Book Error for part 1 ", err)
        //   );
      });
    } else {
      Promise.all([
        sectionalMetadataFields.debate_title_subject,

        sectionalMetadataFields.debate_participants,
        sectionalMetadataFields.issues_section,
      ]).then(async (value) => {
        // console.log("[DEBUG App JS Part 2] The value of promise all", value);
        sectionalMetadataFields.debate_title_subject = value[0];

        sectionalMetadataFields.debate_participants = value[1];
        sectionalMetadataFields.issues_section = value[2];
        // console.log(
        //   "[DEBUG]  Sectional Metadata Fields part 2",
        //   sectionalMetadataFields
        // );
        const newSectionBook = new SectionalBookModel(sectionalMetadataFields);

        try {
          const dbSave = await newSectionBook.save();
          Promise.all([dbSave])
            .then((value) => {
              console.log(
                "[SAVED] The new Book Structure  Migrated to local Mongo for Part 2 ",
                value[0]
              );
            })
            .catch((err) => {
              throw new Error(
                `[Error] occured while inserting ${sectionalMetadataFields.book_id} at section id ${sectionalMetadataFields.migrateId}  with the following error ${err}`
              );
              process.exit();
            });
        } catch (err) {
          throw new Error(
            `[Error] occured while inserting ${sectionalMetadataFields.book_id} at section id ${sectionalMetadataFields.migrateId}  with the following error ${err}`
          );

          process.exit();
        }

        // newSectionBook
        //   .save()
        //   .then((title) => {
        //     console.log(
        //       "[SAVED] The new Book Structure  Migrated to local Mongo for Part 2 ",
        //       title
        //     );
        //   })
        //   .catch((err) =>
        //     console.log("[ERROR] The Book Error for part 2 ", err)
        //   );
      });
    }
  }
  // });
  //  });
}

//populateStructuralMetadata(DEBATES_12_SRC);
//https://blog.heroku.com/best-practices-nodejs-errors
populateSectionalMetadata(DEBATES_12_SRC, "section", "110");

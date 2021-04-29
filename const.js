const mongoose = require("mongoose");
const format = require("date-fns/format");
const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

// Debate Title Model
const DebateTitleModel = require("./models/DebateTitle");
const IssuesModel = require("./models/Issues");
const MembersModel = require("./models/MemberParticipant");
const PortfolioModel = require("./models/MinisterPortfolio");
const SpeakersModel = require("./models/Speaker");
const StructureBookModel = require("./models/StructureBook");
const SectionalBookModel = require("./models/SectionalMetadata");
const MinisterPortfolio = require("./models/MinisterPortfolio");

//  Dropping the Databases
// export function dropDatabases() {
//   var dbs = db.getMongo().getDBNames();
//   dbs.forEach(function (dbName) {
//     dbd = db.getMongo().getDB(dbName);
//     print("Dropping " + dbName + " database");
//     db.dropDatabase();
//   });
// }

// Source Files for
const logFileSuccess =
  "/home/vaibhav/Documents/VidhanDocsTracker/populateDB/logs/logs-success.txt";

const logFileFail =
  "/home/vaibhav/Documents/VidhanDocsTracker/populateDB/logs/logs-error.txt";

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

// Populating Metadata

function populateMetadata(metadataType, inputDir) {
  if (metadataType === "debatetitle") {
    filename = `metadata_klc_${metadataType}.xls`;
    const pathFile = path.join(inputDir, filename);
    console.log(`[METADATA] The excel file is reading for ${pathFile}`);
    const excelItems = readExcelFile(pathFile);

    excelItems.map((item) => {
      let debateTitle = {};
      debateTitle.name_eng = item["Title (English)"];
      debateTitle.name_kan = item["Title (Kannada)"];

      const newDebateTitleField = new DebateTitleModel(debateTitle);

      newDebateTitleField.save().then((title) => {
        console.log(
          "[SAVED] The new Debate Title Migrated to local Mongo ",
          title
        );
      });
    });

    console.log("The length of excelItem is", excelItems.length);
  }
  if (metadataType === "issues") {
    filename = `metadata_klc_${metadataType}.xls`;
    const pathFile = path.join(inputDir, filename);
    console.log(`[METADATA] The excel file is reading for ${pathFile}`);
    const excelItems = readExcelFile(pathFile);

    console.log(excelItems);

    excelItems.map((item) => {
      let issuesObject = {};
      issuesObject.name_eng = item["Name (English)"];
      issuesObject.name_kan = item["Name (Kannada)"];

      const newIssuesField = new IssuesModel(issuesObject);

      newIssuesField.save().then((title) => {
        console.log("[SAVED] The new Issues Migrated to local Mongo ", title);
      });
    });

    console.log("The length of excelItem is", excelItems.length);
  }

  if (metadataType === "members") {
    filename = `metadata_klc_${metadataType}.xls`;
    const pathFile = path.join(inputDir, filename);
    console.log(`[METADATA] The excel file is reading for ${pathFile}`);
    const excelItems = readExcelFile(pathFile);

    console.log(excelItems);

    excelItems.map((item) => {
      let membersObject = {};
      membersObject.name_eng = item["Name (English)"];
      membersObject.name_kan = item["Name (Kannada)"];

      const newMembersField = new MembersModel(membersObject);

      newMembersField.save().then((title) => {
        console.log("[SAVED] The new Issues Migrated to local Mongo ", title);
      });
    });

    console.log("The length of excelItem is", excelItems.length);
  }

  if (metadataType === "portfolio") {
    filename = `metadata_klc_${metadataType}.xls`;
    const pathFile = path.join(inputDir, filename);
    console.log(`[METADATA] The excel file is reading for ${pathFile}`);
    const excelItems = readExcelFile(pathFile);

    console.log(excelItems);

    excelItems.map((item) => {
      let portfolioObject = {};
      portfolioObject.name_eng = item["Portfolio Name (English)"];
      portfolioObject.name_kan = item["Portfolio Name (Kannada)"];

      const newPortfolioField = new PortfolioModel(portfolioObject);

      newPortfolioField.save().then((title) => {
        console.log("[SAVED] The new Issues Migrated to local Mongo ", title);
      });
    });

    console.log("The length of excelItem is", excelItems.length);
  }

  if (metadataType === "speakers") {
    filename = `metadata_klc_${metadataType}.xls`;
    const pathFile = path.join(inputDir, filename);
    console.log(`[METADATA] The excel file is reading for ${pathFile}`);
    const excelItems = readExcelFile(pathFile);

    console.log(excelItems);

    excelItems.map((item) => {
      let speakersObject = {};
      speakersObject.name_eng = item["Name (English)"];
      speakersObject.name_kan = item["Name (Kannada)"];

      const newSpeakersField = new SpeakersModel(speakersObject);

      newSpeakersField.save().then((title) => {
        console.log("[SAVED] The new Issues Migrated to local Mongo ", title);
      });
    });

    console.log("The length of excelItem is", excelItems.length);
  }
}

function populateStructuralMetadata(srcDir) {
  // function to convert the string of dates to array of dates
  function changeDatesToArray(datesString) {
    console.log(
      "[DEBUG] The value of the dates are date string are",
      datesString
    );
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

  files = fs.readdirSync(srcDir);
  files_struct = files.filter((filenames) => {
    return filenames.includes("struct") || filenames.includes("structure");
  });

  // Map through all the elements of the structural metadata

  files_struct.map((filenames) => {
    file_name_excel = path.join(srcDir, filenames);
    //console.log(file_name_excel);
    console.log("[READING] reading excel file from ", file_name_excel);
    excel_response = readExcelFile(file_name_excel);
    // console.log("[DEBUG] the value of the excel response is ", excel_response);
    let structMetadataObject = {};
    structMetadataObject.bookId = excel_response[0]["Book ID"];
    // structMetadataObject.assembly_number = replaceStringSpace(
    //   excel_response[0]["Assembly Number"]
    // );
    structMetadataObject.session_number = replaceStringSpace(
      excel_response[0]["Session Number"]
    );
    structMetadataObject.volume_number = replaceStringSpace(
      excel_response[0]["Volume Number"]
    );
    structMetadataObject.numofpages = excel_response[0]["Num Pages"];
    structMetadataObject.place_session = replaceStringSpace(
      excel_response[0]["Place of Session"]
    );
    structMetadataObject.dates_session = changeDatesToArray(
      excel_response[0]["Dates"]
    );

    //structMetadataObject.dates_session = excel_response[0]["Dates"];

    structMetadataObject.year_book = generateYear(
      changeDatesToArray(excel_response[0]["Dates"])
    );
    // console.log(structMetadataObject);
    // console.log(changeDatesToArray(structMetadataObject.dates_session));
    const newStructureBook = new StructureBookModel(structMetadataObject);

    newStructureBook.save().then((title) => {
      console.log(
        "[SAVED] The new Book Structure  Migrated to local Mongo ",
        title
      );
    });
  });
}

// For Sectional Metadata add Debate Title Id
// function getDebateTitleId(title) {
//   // Get the Debate Title Id from the database
//   // let titleId;
//   return new Promise(function (resolve, reject) {
//     if (title === "NA" || title === "") {
//       resolve("");
//     } else {
//       DebateTitleModel.find({ name_eng: title })
//         .then((debatetitle) => {
//           // console.log(
//           //   "[DEBUG] from get debate title id Debate Titel ",
//           //   debatetitle
//           // );
//           resolve(debatetitle._id);
//         })
//         .catch((err) => reject(err));
//     }
//   });
// }
// Promise All

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

async function getDebateTitleId(title, bookid, sectionid) {
  // writeFileSyncSuccess(
  //   `[${new Date()}][Logging i ${title}] in Book ID ${bookid} in section id ${sectionid}  \n`,
  //   logFileSuccess
  // );
  // writeFileSyncSuccess(
  //   `[${new Date()}][Logging global ${title}] in Book ID ${bookid} in section id ${sectionid}  \n`,
  //   logFileSuccess
  // );

  if (title === "NA" || title === "") {
    // resolve("");
    writeFileSyncError(
      `[${new Date()}][ERROR in ${title}][DEBATE TITLE DONT EXIST] in Book ID ${bookid} in section id ${sectionid} has DEBATE TITLE === NA or Blank \n`,
      logFileFail
    );
  } else {
    try {
      if (title.includes(",")) {
        var title = title.split(",")[0];
      }
      var titleId = await DebateTitleModel.findOne({
        name_eng: title.trim(),
      });
      // Promise.all([titleId]).then((values) => {
      //   return values[0][0]._id;
      // });
      //resolve(titleId._id);
      return titleId._id;
    } catch (error) {
      writeFileSyncError(
        `[${new Date()}][ERROR in ${title}] in Book ID ${bookid} in section id ${sectionid} has error ${error} \n`,
        logFileFail
      );
      return error;
      //reject(error);
      //console.log(error);
    }
  }
  //return new Promise(async function (resolve, reject) {});
  // Get the Debate Title Id from the database
  // let titleId;
}

// Dummy Debate Title Id

function getDebateDummyTitleId(title, bookid, sectionid) {
  // Get the Debate Title Id from the database
  // let titleId;
  if (title === "NA" || title === "") {
    // resolve("");
  } else {
    try {
      if (title.includes(",")) {
        var title = title.split(",")[0];
      }
      //      var titleId = await DebateTitleModel.findOne({ name_eng: title });
      // Promise.all([titleId]).then((values) => {
      //   return values[0][0]._id;
      // });
      console.log(title);
      //return titleId._id;
    } catch (error) {
      // writeFileSyncError(
      //   `[${new Date()}][ERROR in ${title}] in Book ID ${bookid} in section id ${sectionid} has error ${error} \n`,
      //   logFileFail
      // );
      console.log(error);
    }
  }
}

// // // Get Issues Field // // //
async function getIssuesField(title, bookid, sectionid) {
  // Get the Issues Field from the database

  return new Promise(async function (resolve, reject) {
    try {
      let issuesfieldId = await IssuesModel.find({ name_eng: title.trim() });
      // writeFileSyncSuccess(
      //   `[${new Date()}][ERROR in ${title}] in Book ID ${bookid} in section id ${sectionid} has been inserted \n `,
      //   logFileSuccess
      // );
      let issuesArrayModified = [issuesfieldId[0]._id];
      // writeFileSyncSuccess(
      //   `[${new Date()}][Success in ${title}] ISSUES in Book ID ${bookid} in section id ${sectionid} has been inserted ${issuesArrayModified}  \n `,
      //   logFileSuccess
      // );
      // console.log(
      //   "[DEBUG ISSUES] The value of issues Field Id ",
      //   issuesfieldId
      // );

      // console.log(
      //   "[DEBUG ISSUES] The value of issues array ",
      //   issuesArrayModified
      // );
      resolve(issuesArrayModified);
      // if (title === "NA" || title === "") {
      //   return [];
      // } else {
      //   let issuesfieldId = await IssuesModel.find({ name_eng: title });

      //   return issuesfieldId._id;
      // }
    } catch (error) {
      writeFileSyncError(
        `[${new Date()}][ERROR in ${title}] in Book ID ${bookid} in section id ${sectionid} has error ${error} \n `,
        logFileFail
      );
      // console.log(`[DEBUG ISSUES] the error in issues field`, error);
      reject(error);
    }
  });
  //var issuesArray = [];
}

// // // Get Members's Field // // //
async function getMembersDetails(membername, section) {
  // Get the member names Id from the database
  // let titleId;

  try {
    if (membername === "NA") {
      //console.log("[DEBUG Member not Found] ", membername);
      return "";
    } else {
      if (membername.includes(",")) {
        var membername = membername.split(",")[0];
      }
      // console.log("[DEBUG] Getting Member Name", membername);
      let memberId = await MembersModel.findOne({
        name_eng: membername,
      });
      //console.log("[DEBUG] Getting Member Name after database", memberId);
      return memberId._id;
    }
  } catch (error) {
    writeFileSyncError(
      `[${new Date()}][Error in ${membername}] The get Members in Book ${
        section.book_id
      } @sectionid ${
        section.migrateId
      } in ${membername} has error ${error} \n `,
      logFileFail
    );
    throw new Error(
      ` Error Occurred in {sectionalMetadataFields.migrateId} get MemberDetails for membername ${membername} - ${error}`
    );
    process.exit();
    //console.log(error);
  }
}

// // Get Minister Portfolio

async function getMinisterPortfolio(portfolioname, section) {
  //console.log("[DEBUG] The Ministry Portfolio is ", portfolioname);
  if (portfolioname.includes(",")) {
    let portfolios = portfolioname.split(",");
    //console.log("[DEBUG] The Ministry Portfolio is ", portfolios);

    try {
      let ministryName = await MinisterPortfolio.findOne({
        name_eng: portfolios[0].trim(),
      });
      //console.log("[DEBUG] The Ministry Portfolio is ", ministryName);
      return ministryName._id;
    } catch (error) {
      writeFileSyncError(
        `[${new Date()}][Error in ${portfolioname}] The get Minister Portfolioin Book ${
          section.book_id
        } @sectionid ${
          section.migrateId
        } in ${portfolioname} has error ${error} \n `,
        logFileFail
      );
      throw new Error(
        `The get Minister Portfolio {section.migrateId} in Book {bookId} in ${portfolioname} has error ${error}`
      );
      //console.log(error);
    }
  } else {
    try {
      let ministryName = await MinisterPortfolio.findOne({
        name_eng: portfolioname.trim(),
      });

      return ministryName._id;
    } catch (error) {
      writeFileSyncError(
        `[${new Date()}][Error in ${portfolioname}] The get Minister Portfolioin Book ${
          section.book_id
        } @sectionid ${
          section.migrateId
        } in ${portfolioname} has error ${error} \n`,
        logFileFail
      );
      throw new Error(
        `The get Minister Portfolio {section.migrateId} in Book {bookId} in ${portfolioname} has error ${error}`
      );
    }
  }
  // if (portfolioname === "NA" || portfolioname === "") {
  //   // Get the member names Id from the database
  //   // let titleId;
  //   return "";
  // } else {
  //   let ministryName = await MinisterPortfolio.findOne({
  //     name_eng: portfolioname,
  //   });

  //   return ministryName._id;
  // }
}

// Get Member Participants in array

async function getMemberParticipants(stringValue, bookid, migrateid) {
  return new Promise(async function (resolve, reject) {
    let memberIds = [];
    let stringValueArray = stringValue.split(",");

    console.log("[DEBUG] the value of string value array", stringValueArray);
    var memberName;

    for (memberName in stringValueArray) {
      try {
        let member = await MembersModel.find({
          name_eng: stringValueArray[memberName], //memberName.trim(),
        });

        console.log("[DEBUG] the value of member ", member);

        Promise.all([member])
          .then((value) => {
            console.log("[DEBUG] Inside Promise All member", value);
            let memberid = value[0]._id;
            memberIds.push(memberid);
            // console.log("[DEBUG] The Value of MemberIds", memberIds);
            if (memberIds.length === stringValueArray.length) {
              // console.log(
              //   "[DEBUG] the value of inside the if ",
              //   memberIds.length === stringValueArray.length
              // );
              // console.log(
              //   `[DEBUG ] the value of idx is ${memberName}  & length is ${
              //     stringValueArray.length
              //   } && ${memberName + 1 === stringValueArray.length}`
              // );
              // console.log("[DEBUG] get Member Participants  ", memberIds);
              console.log(
                "[DEBUG Get Member Particiapnts] Resolved",
                memberIds
              );
              resolve(memberIds);
            }
          })
          .catch((err) => {
            writeFileSyncError(
              `[${new Date()}][ERROR][GET MEMBER PARTICIPANTS ${stringValue}] occurred in BookId ${bookid} Section Id for ${migrateid} with error ${err} \n`,
              logFileFail
            );
            console.log(
              "[DEBUG] The value of the error in Debate Participants is ",
              err
            );
            throw new Error(err);
            reject(err);
          });
        // console.log(
        //   `[DEBUG] ${idx} index ,length is ${arr.length} of array ${arr} `
        // );
      } catch (error) {
        writeFileSyncError(
          `[${new Date()}][ERROR][GET MEMBER PARTICIPANTS ${stringValue}] occurred in BookId ${bookid} Section Id for ${migrateid} with error ${error} \n`,
          logFileFail
        );
        console.log("[DEBUG]  ", error);
        reject(error);
      }
    }
    // console.log(
    //   "[DEBUG] the value of ",
    //   memberIds.length === stringValueArray.length
    // );

    // stringValueArray.map(async (memberName, idx, arr) => {
    //   console.log(
    //     "[DEBUG] The value of Debate Participants Member ",
    //     memberName,
    //     idx
    //   );

    //   try {
    //     let member = await MembersModel.findOne({
    //       name_eng: memberName.trim(),
    //     });

    //     Promise.all([member])
    //       .then((value) => {
    //         console.log("[DEBUG] Inside Promise All member", value[0]._id);
    //         let memberid = value[0]._id;
    //         memberIds.push(memberid);
    //         console.log("[DEBUG] The Value of MemberIds", memberIds);
    //         if (idx + 1 === arr.length) {
    //           console.log(
    //             `[DEBUG ] the value of idx is ${idx}  & length is ${
    //               arr.length
    //             } && ${idx + 1 === arr.length}`
    //           );
    //           // console.log("[DEBUG] get Member Participants  ", memberIds);
    //           console.log("[DEBUG Get Member] Resolved", memberIds);
    //           resolve(memberIds);
    //         }
    //       })
    //       .catch((err) => {
    //         console.log(
    //           "[DEBUG] The value of the error in Debate Participants is ",
    //           err
    //         );
    //         throw new Error(err);
    //       });
    //     // console.log(
    //     //   `[DEBUG] ${idx} index ,length is ${arr.length} of array ${arr} `
    //     // );
    //   } catch (error) {
    //     console.log(error);
    //     reject(error);
    //   }
    // });

    // if (stringValueArray.length === memberIds.length) {
    //   // console.log(
    //   //   `[DEBUG ] the value of idx is ${idx}  & length is ${arr.length} && ${
    //   //     idx + 1 === arr.length
    //   //   }`
    //   // );
    //   // console.log("[DEBUG] get Member Participants  ", memberIds);
    //   console.log("[DEBUG Get Member] Resolved", memberIds);
    //   resolve(memberIds);
    // }
  });
}

// Get Dates in ISO Formate
function getDateInIsoFormat(stringDate, bookid, sectionid) {
  try {
    let dateValueArray = stringDate.split("-");
    // d[0] - dd  d[1] -MM d[2]-yyyy
    var resDate = new Date(
      dateValueArray[2],
      parseInt(dateValueArray[1], 10) - 1,
      parseInt(dateValueArray[0], 10)
    );
  } catch (error) {
    writeFileSyncError(
      `[${new Date()}][ERROR in ${stringDate}] The Error occured in get Dates function with migrateid ${sectionid} in Book Number ${bookid} has error ${error} \n `,
      logFileFail
    );
    throw new Error(
      `The Error occured in get Dates function with migrateid ${field.migrateId} in Book Number ${field.book_id} `
    );
  }

  return resDate;
}

////////////////////// Populate Sectional Metadata //////////////////////

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
  // Getting the files from the source directory
  files = fs.readdirSync(srcDir);

  function getFileByBookId(filesSearch, book, filetype) {
    var searchBook = book + "_" + filetype + ".xls";
    //   console.log("[DEBUG] the search book", searchBook);
    var indexOfFile = filesSearch.indexOf(searchBook);
    //  console.log("[DEBUG] the search index book", indexOfFile);

    return filesSearch[indexOfFile];
  }

  files_struct = files.filter((filenames) => {
    return filenames.includes("_" + fileType);
  });

  console.log("[DEBUG] the file structure", files_struct);
  // ////// Debug

  //files_struct.forEach(async (fileName) => {
  for (var fileindex in files_struct) {
    // console.log("[DEBUG] files _ struct", files_struct);
    let filename = files_struct[fileindex];
    //  console.log("[DEBUG] filename", filename);
    // file_name_excel = path.join(
    //   srcDir,
    //   getFileByBookId(files, bookid, fileType)
    // );
    //   //console.log(file_name_excel);
    //console.log("[READING] reading excel file from ", file_name_excel);
    //try {
    excel_response = readExcelFile(path.join(srcDir, filename));
    // writeFileSyncSuccess(
    //   `[SUCCESS] in opening the BookId ${getBookId(
    //     filename
    //   )} file ${filename} \n`,
    //   logFileSuccess
    // );
    // } catch (error) {
    // writeFileSyncError(
    //   `[FAILURE] in opening the BookId ${getBookId(
    //     filename
    //   )} file ${filename} \n`,
    //   logFileFail
    // );
    //  }

    //console.log("File Responses", excel_response);
    // Map through all the elements of the structural metadata
    //console.log("[DEBUG] The excel response ", excel_response);

    for (var section in excel_response) {
      let debatesection = excel_response[section];
      // Book 21
      // console.log("[DEBUG] The debate section ", debatesection);
      let sectionalMetadataFields = {};
      sectionalMetadataFields.migrateId = debatesection["ID"];
      sectionalMetadataFields.book_id = getBookId(filename);
      sectionalMetadataFields.section_type = debatesection["Section Type"];
      sectionalMetadataFields.start_page = debatesection["Start Page"];
      sectionalMetadataFields.end_page = debatesection["End Page"];
      // sectionalMetadataFields.debate_title_subject = getDebateTitleId(
      //   debatesection["Title"]
      // );
      sectionalMetadataFields.debate_title_subject = getDebateTitleId(
        debatesection["Title"],
        sectionalMetadataFields.book_id,
        sectionalMetadataFields.migrateId
      );

      if (debatesection.Issues !== "NA") {
        // console.log("[DEBUG] debate Issues ", debatesection.Issues);
        sectionalMetadataFields.issues_section = getIssuesField(
          debatesection["Issues"],
          sectionalMetadataFields.book_id,
          sectionalMetadataFields.migrateId
        );
      } else {
        sectionalMetadataFields.issues_section = [];
      }
      if (debatesection["Subject Eng"]) {
        sectionalMetadataFields.debate_subject_kan =
          debatesection["Subject Eng"];
      } else {
        sectionalMetadataFields.debate_subject_kan =
          debatesection["Subject Kan"];
      }

      sectionalMetadataFields.debate_section_date = getDateInIsoFormat(
        debatesection["Dates"],
        sectionalMetadataFields.book_id,
        sectionalMetadataFields.migrateId
      );

      if (debatesection["Annexure ID"])
        sectionalMetadataFields.annexure_migrate_id =
          debatesection["Annexure ID"];
      if (
        debatesection["Participants"] === "NA" ||
        ///debatesection["Participants"] === "" ||
        debatesection["Participants"] === null ||
        debatesection["Participants"] === undefined
      ) {
        sectionalMetadataFields.debate_participants = [];
      } else {
        try {
          sectionalMetadataFields.debate_participants = await getMemberParticipants(
            debatesection["Participants"],
            sectionalMetadataFields.book_id,
            sectionalMetadataFields.migrateId
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
            debatesection["Portfolio"],
            sectionalMetadataFields
          );
        }

        if (debatesection["Questioner"] !== "NA") {
          sectionalMetadataFields.questioner_name = getMembersDetails(
            debatesection["Questioner"],
            sectionalMetadataFields
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

          const newSectionBook = new SectionalBookModel(
            sectionalMetadataFields
          );

          try {
            const dbSave = await newSectionBook.save();
            Promise.all([dbSave])
              .then((value) => {
                writeFileSyncSuccess(
                  `[${new Date()}] [SAVED] The new Book ID ${
                    sectionalMetadataFields.book_id
                  } with section id ${
                    sectionalMetadataFields.migrateId
                  } Migrated to local Mongo for Part 1 \n `,
                  logFileSuccess
                );
                // writeFileSyncSuccess(
                //   `[${new Date()}] [Success !!!] while inserting Book Id [${getBookId(
                //     filename
                //   )}]  \n`,
                //   logFileSuccess
                // );
                console.log(
                  "[SAVED] The new Book Structure  Migrated to local Mongo for Part 1 ",
                  value[0]
                );
              })
              .catch((err) => {
                writeFileSyncError(
                  `[${new Date()}] [Error] occured while inserting ${
                    sectionalMetadataFields.book_id
                  } at section id ${
                    sectionalMetadataFields.migrateId
                  }  with the following error ${err} \n`,
                  logFileFail
                );
                throw new Error(
                  `[Error] occured while inserting ${sectionalMetadataFields.book_id} at section id ${sectionalMetadataFields.migrateId}  with the following error ${err}`
                );
              });
          } catch (err) {
            writeFileSyncError(
              `[${new Date()}] [Error] occured while inserting ${
                sectionalMetadataFields.book_id
              } at section id ${
                sectionalMetadataFields.migrateId
              }  with the following error ${err} \n `,
              logFileFail
            );
            throw new Error(
              `[Error] occured while inserting ${sectionalMetadataFields.book_id} at section id ${sectionalMetadataFields.migrateId}  with the following error ${err}`
            );
          }
        });
      } else {
        Promise.all([
          sectionalMetadataFields.debate_title_subject,

          sectionalMetadataFields.debate_participants,
          sectionalMetadataFields.issues_section,
          sectionalMetadataFields.debate_title_subject,
        ]).then(async (value) => {
          // console.log("[DEBUG App JS Part 2] The value of promise all", value);
          sectionalMetadataFields.debate_title_subject = value[0];

          sectionalMetadataFields.debate_participants = value[1];
          sectionalMetadataFields.issues_section = value[2];
          sectionalMetadataFields.debate_title_subject = value[3];
          // console.log(
          //   "[DEBUG]  Sectional Metadata Fields part 2",
          //   sectionalMetadataFields
          // );
          const newSectionBook = new SectionalBookModel(
            sectionalMetadataFields
          );

          try {
            const dbSave = await newSectionBook.save();
            Promise.all([dbSave])
              .then((value) => {
                writeFileSyncSuccess(
                  `[${new Date()}] [SAVED] The new Book ID ${
                    sectionalMetadataFields.book_id
                  }  Migrated with section id ${
                    sectionalMetadataFields.migrateId
                  } to local Mongo for Part 2 \n`,
                  logFileSuccess
                );
                console.log(
                  "[SAVED] The new Book Structure  Migrated to local Mongo for Part 2 ",
                  value[0]
                );
              })
              .catch((err) => {
                writeFileSyncError(
                  `[${new Date()}] [Error] occured while inserting ${
                    sectionalMetadataFields.book_id
                  } at section id ${
                    sectionalMetadataFields.migrateId
                  }  with the following error ${err} \n `,
                  logFileFail
                );
                throw new Error(
                  `[Error] occured while inserting ${sectionalMetadataFields.book_id} at section id ${sectionalMetadataFields.migrateId}  with the following error ${err} \n`
                );
              });
          } catch (err) {
            writeFileSyncError(
              `[${new Date()}] [Error] occured while inserting ${
                sectionalMetadataFields.book_id
              } at section id ${
                sectionalMetadataFields.migrateId
              }  with the following error ${err} \n`,
              logFileFail
            );
            throw new Error(
              `[Error] occured while inserting ${sectionalMetadataFields.book_id} at section id ${sectionalMetadataFields.migrateId}  with the following error ${err} \n`
            );
          }
        });
      }
    }
  }
}

async function checkBookIDSections(sectionsArray, bookid) {
  let section_array_length = sectionsArray.length;

  console.log("[DEBUG] from checkBookIdSections ", bookid);

  try {
    let countSection = await SectionalBookModel.countDocuments({
      book_id: bookid,
    });
    Promise.all([countSection]).then((value) => {
      console.log(`[DEBUG] from checkBokIDSections the value is ${value}`);
      if (value[0] !== section_array_length) {
        var errorString = `[${new Date()}] For ${bookid} The Section Count in Mongo is ${
          value[0]
        } & Excel Sheet Count is ${section_array_length} \n`;
        writeFileSyncError(errorString, logFileFail);
      } else {
        var successString = `[${new Date()}] For ${bookid} The Section Count in Mongo is ${
          value[0]
        } & Excel Sheet Count is ${section_array_length} is validated \n`;
        writeFileSyncSuccess(successString, logFileSuccess);
      }
    });
  } catch (error) {
    var errorString = `[${new Date()}] Cannot Fetch from MongoD Sectional Model for BookId ${bookid} is not validated \n `;
    writeFileSyncError(errorString, logFileFail);
  }
}

async function populateAnnexureToDatabase(inputDir) {
  // TODO List the Directory

  annexure_files = fs.readdirSync(inputDir);

  //console.log("[DEBUG] Get the Annexure Directory ", annexure_files);
  //  Add a for loop here
  for (var filename in annexure_files) {
    file = annexure_files[filename];

    annexure_excel_response = readExcelFile(path.join(inputDir, file));
    //console.log("[DEBUG] Get the Annexure Content ", annexure_excel_response);

    for (var annexIndex in annexure_excel_response) {
      let annexItem = annexure_excel_response[annexIndex];

      //console.log("[DEBUG] the Annex Item is ", annexItem);

      var sectAnnexObject = {};

      sectAnnexObject.book_id_num = annexItem["Book ID"];
      sectAnnexObject.migrateId = annexItem["Annexure ID"];
      sectAnnexObject.annexure_title = annexItem["Title"];
      sectAnnexObject.start_page = annexItem["Start Page"];
      sectAnnexObject.end_page = annexItem["End Page"];

      console.log("[DEBUG] the value of sectAnnex  object", sectAnnexObject);

      const newSectionAnnexure = new Annexure(sectAnnexObject);

      try {
        const dbSaveAnnexure = await newSectionAnnexure.save();
        Promise.all([dbSaveAnnexure])
          .then(async (valueAnnexure) => {
            //   writeFileSyncSuccess(
            //     `[${new Date()}] [SAVED] The new Book ID ${
            //       sectionalMetadataFields.book_id
            //     }  Migrated to local Mongo for Part 1 `,
            //     logFileSuccess
            //   );
            try {
              // console.log(
              //   "[DEBUG][ANEEXURE AFTER SAVE] the value returned",
              //   valueAnnexure
              // );
              // console.log(
              //   "[DEBUG][ANEEXURE AFTER SAVE] the value returned for migrate ID",
              //   valueAnnexure[0]["migrateId"]
              // );
              var annexureID = valueAnnexure[0]["_id"];

              const SectionalMetadata = await SectionalBookModel.findOneAndUpdate(
                {
                  annexure_migrate_id: valueAnnexure[0]["migrateId"],
                },
                {
                  $push: { annexure: annexureID },
                },
                {
                  new: true,
                }
              );

              Promise.all([SectionalMetadata])
                .then((valueSection) => {
                  // console.log(
                  //   "[DEBUG][SECTIONAL METADATA ANEEXURE AFTER SAVE] the value returned for migrate ID",
                  //   valueSection
                  // );
                  let annexureFields = valueSection[0];
                  writeFileSyncSuccess(
                    `[${new Date()}][Annexure ID ${
                      annexureFields.migrateId
                    }] from ${file} with title succesfully saved in SECTIONAL METADATA database the value of annexure is ${
                      annexureFields.annexure
                    } !!! \n `,
                    logFileSuccess
                  );
                })
                .catch((error) => {
                  writeFileSyncError(
                    `[${new Date()}][ERROR][Annexure ID ${
                      sectAnnexObject.migrateId
                    }] from ${file} with title failed to saved in SECTIONAL METADATA database with ${error} !!! \n `,
                    logFileFail
                  );
                  throw new Error(
                    `[${new Date()}][ERROR][Annexure ID ${
                      sectAnnexObject.migrateId
                    }] from ${file} with title failed to saved in SECTIONAL METADATA database with ${error} !!! \n `
                  );
                });
            } catch (error) {
              writeFileSyncError(
                `[${new Date()}][ERROR][Annexure ID ${
                  sectAnnexObject.migrateId
                }] from ${file} with title failed to saved in SECTIONAL METADATA database with ${error} !!! \n `,
                logFileFail
              );
              throw new Error(
                `[${new Date()}][ERROR][Annexure ID ${
                  sectAnnexObject.migrateId
                }] from ${file} with title failed to saved in SECTIONAL METADATA database with ${error} !!! \n `
              );
            }
          })
          .catch((err) => {
            writeFileSyncError(
              `[${new Date()}] [Error] occured while inserting ${
                sectionalMetadataFields.book_id
              } at section id ${
                sectionalMetadataFields.migrateId
              }  with the following error ${err} \n`,
              logFileFail
            );
            throw new Error(
              `[Error] occured while inserting ${sectionalMetadataFields.book_id} at section id ${sectionalMetadataFields.migrateId}  with the following error ${err}`
            );
          });
      } catch (error) {
        writeFileSyncError(
          `[${new Date()}][ERROR][Annexure ID ${
            sectAnnexObject.migrateId
          }] from ${file} with title failed to saved in Annexure  database with ${error} !!! \n `,
          logFileFail
        );
        throw new Error(
          `[${new Date()}][ERROR][Annexure ID ${
            sectAnnexObject.migrateId
          }] from ${file} with title failed to saved in Annexure  database with ${error} !!! \n `
        );
      }
    }
  }
}
module.exports = {
  getDateInIsoFormat,
  populateMetadata,
  populateStructuralMetadata,
  getDebateTitleId,
  getIssuesField,
  getMembersDetails,
  getMinisterPortfolio,
  getMemberParticipants,
  getMembersDetails,
  populateAnnexureToDatabase,
  populateSectionalMetadata,
};

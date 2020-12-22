//  Dropping the Databases
export function dropDatabases() {
  var dbs = db.getMongo().getDBNames();
  dbs.forEach(function (dbName) {
    dbd = db.getMongo().getDB(dbName);
    print("Dropping " + dbName + " database");
    db.dropDatabase();
  });
}

// Populating Metadata

export function populateMetadata(metadataType, inputDir) {
  if (metadataType === "debatetitle") {
    filename = "metadata_kla_debatetitle.xls";
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
    filename = `metadata_kla_${metadataType}.xls`;
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
    filename = `metadata_kla_${metadataType}.xls`;
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
    filename = `metadata_kla_${metadataType}.xls`;
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
    filename = `metadata_kla_${metadataType}.xls`;
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

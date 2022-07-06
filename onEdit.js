function onEdit() {
  var ss = SpreadsheetApp.openById(
    "1-5INbietTNW4Tgm28PbwiwD5gGB_UayTGDAacVJVTo0"
  );
  var sheet = ss.getSheetByName("SlackGooglesheet");
  var sheetEKLE = ss.getSheetByName("SlackGooglesheetEKLE");
  var sheetIPTAL = ss.getSheetByName("SlackGooglesheetIPTAL");
  var rangeValues = sheet.getRange("A2:B10000").getValues();
  var getLastRowSheetEKLE = sheetEKLE.getLastRow();
  var getLastRowSheetIPTAL = sheetIPTAL.getLastRow();

  var ekleList = [];
  var iptalList = [];

  var filteredRangeValues = rangeValues.filter(function (el) {
    return el != ",";
  });

  let result = filteredRangeValues[filteredRangeValues.length - 1][0].substring(
    0,
    4
  );

  if (result === "EKLE") {
    var before1 = filteredRangeValues[
      filteredRangeValues.length - 1
    ][0].replace("EKLE ", "");
    var before2 = before1.replace(",", "");
    ekleList.push(before2);

    // Logger.log(before2)
    // Logger.log(sheetEKLE.getRange(getLastRowSheetEKLE, 2).getValues()[0][0])

    if (
      sheetEKLE.getRange(getLastRowSheetEKLE, 2).getValues()[0][0] !== before2
    ) {
      sheetEKLE
        .getRange(getLastRowSheetEKLE + 1, 2)
        .setValues([[ekleList[ekleList.length - 1]]]);
    } else {
      Logger.log("Last row and entered row are equal");
    }
  } else if (result === "IPTA") {
    var before3 = filteredRangeValues[
      filteredRangeValues.length - 1
    ][0].replace("IPTAL ", "");
    var before4 = before3.replace(",", "");
    iptalList.push(before4);

    if (
      sheetIPTAL.getRange(getLastRowSheetIPTAL, 2).getValues()[0][0] !== before4
    ) {
      sheetIPTAL
        .getRange(getLastRowSheetIPTAL + 1, 2)
        .setValues([[iptalList[iptalList.length - 1]]]);
    } else {
      Logger.log("Last row and entered row are equal");
    }
  } else {
    Logger.log("Something is not right.");
  }

  return ContentService.createTextOutput("Done! -Mocukbot");
}

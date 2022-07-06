function onEditDel() {
  var ss = SpreadsheetApp.openById(
    "1-5INbietTNW4Tgm28PbwiwD5gGB_UayTGDAacVJVTo0"
  );
  var sheet = ss.getSheetByName("SlackGooglesheet");
  var sheetEKLE = ss.getSheetByName("SlackGooglesheetEKLE");
  var sheetIPTAL = ss.getSheetByName("SlackGooglesheetIPTAL");
  var rangeValues = sheet.getRange("A2:B10000").getValues();
  var rangeValuesE = sheetEKLE.getRange("A2:B10000").getValues();
  var rangeValuesI = sheetIPTAL.getRange("A2:B10000").getValues();

  sheetEKLE.getRange("A2:B").sort(2);
  sheetIPTAL.getRange("A2:B").sort(2);

  var delList = [];

  //filter SlackGooglesheet sheets range values
  var filteredRangeValues = rangeValues.filter(function (el) {
    return el != ",";
  });

  //filter SlackGooglesheetEKLE sheets range values
  var filteredRangeValuesE = rangeValuesE.filter(function (el) {
    return el != ",";
  });

  //filter SlackGooglesheetIPTAL sheets range values
  var filteredRangeValuesI = rangeValuesI.filter(function (el) {
    return el != ",";
  });

  var result;

  //iterating to check every entered data at first logging sheet
  for (l = 0; l < filteredRangeValues.length; l++) {
    // Logger.log(filteredRangeValues[l])
    if (filteredRangeValues[l][0].substring(0, 3) === "DEL") {
      result = filteredRangeValues[l][0].substring(0, 3);

      //here it takes last row
      // let result = filteredRangeValues[filteredRangeValues.length - 1][0].substring(0, 3);

      //checking if DEL prefix exists
      if (result === "DEL") {
        var before1 = filteredRangeValues[
          filteredRangeValues.length - 1
        ][0].replace("DEL ", "");
        var before2 = before1.replace(",", "");

        delList.push(before2);

        //checking ekle sheet
        for (i = 0; i < filteredRangeValuesE.length; i++) {
          const found = filteredRangeValuesE[i].find(
            (element) => element === delList[0]
          );
          if (found === delList[0]) {
            sheetEKLE.getRange(i + 2, 2).setValues([[""]]);
            Logger.log("Deletable product has been found in EKLE");
            // return ContentService.createTextOutput('Product shall be deleted within a minute! -Mocukbot');
          } else {
            Logger.log("Error.");
          }
        }

        //checking iptal sheet
        for (i = 0; i < filteredRangeValuesI.length; i++) {
          const found = filteredRangeValuesI[i].find(
            (element) => element === delList[0]
          );

          // Logger.log(delList[0])

          if (found === delList[0]) {
            sheetIPTAL.getRange(i + 2, 2).setValues([[""]]);
            Logger.log("Deletable product has been found in IPTAL");
            // return ContentService.createTextOutput('Product shall be deleted within a minute! -Mocukbot');
          } else {
            Logger.log("Product not found.");
          }
        }
      }
    } else {
      // Logger.log("There is no product with DEL prefix.")
    }
  }

  // }
}

// Taking slack slack data, text parameter
function doPost(e) {
  if (typeof e !== "undefined") {
    //need this because app script doesn't work else
    var ss = SpreadsheetApp.openById(
      "1-5INbietTNW4Tgm28PbwiwD5gGB_UayTGDAacVJVTo0"
    );
    var sheet = ss.getSheetByName("SlackGooglesheet");

    var sheetEKLE = ss.getSheetByName("SlackGooglesheetEKLE");
    var sheetIPTAL = ss.getSheetByName("SlackGooglesheetIPTAL");
    var rangeValues = sheet.getRange("A2:B100000").getValues();
    var getLastRowSheetEKLE = sheetEKLE.getLastRow();
    var getLastRowSheetIPTAL = sheetIPTAL.getLastRow();

    var lastRow = sheet.getLastRow();
    // extract the relevant data
    var parameter = e.parameter;
    //var userName = parameter.user_name;
    var parameterText = parameter.text;
    //var date = new Date();
    var slackDetails = [parameterText];
    // var slackDetails = [parameter];
    // var lastRowValue = sheet.getValue();

    // paste the slack details to the sheet
    // sheet.getRange(lastRow + 1, 1, 1).setValue(JSON.stringify(e));
    sheet.getRange(lastRow + 1, 1, 1).setValues([slackDetails]);

    var ekleList = [];
    var iptalList = [];

    var filteredRangeValues = rangeValues.filter(function (el) {
      return el != ",";
    });

    let result = filteredRangeValues[
      filteredRangeValues.length - 1
    ][0].substring(0, 4);

    if (result === "EKLE") {
      var before1 = filteredRangeValues[
        filteredRangeValues.length - 1
      ][0].replace("EKLE ", "");
      var before2 = before1.replace(",", "");
      ekleList.push(before2);

      sheetEKLE
        .getRange(getLastRowSheetEKLE + 1, 2)
        .setValues([[ekleList[ekleList.length - 1]]]);

      var lastRowUpdated = sheet.getLastRow();
      var ssUpdated = SpreadsheetApp.openById(
        "1-5INbietTNW4Tgm28PbwiwD5gGB_UayTGDAacVJVTo0"
      )
        .getSheetByName("SlackGooglesheet")
        .getRange(lastRowUpdated, 1, 1)
        .getValue();
      var url =
        "https://hooks.slack.com/services/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";

      var payload = {
        text: ssUpdated,
      };

      var options = {
        method: "post",
        contentType: "application/json",
        payload: JSON.stringify(payload),
      };

      UrlFetchApp.fetch(url, options);

      return ContentService.createTextOutput("Done! -Mocukbot");
    } else if (result === "IPTA") {
      var before3 = filteredRangeValues[
        filteredRangeValues.length - 1
      ][0].replace("IPTAL ", "");
      var before4 = before3.replace(",", "");
      iptalList.push(before4);

      sheetIPTAL
        .getRange(getLastRowSheetIPTAL + 1, 2)
        .setValues([[iptalList[iptalList.length - 1]]]);

      var lastRowUpdated = sheet.getLastRow();
      var ssUpdated = SpreadsheetApp.openById(
        "1-5INbietTNW4Tgm28PbwiwD5gGB_UayTGDAacVJVTo0"
      )
        .getSheetByName("SlackGooglesheet")
        .getRange(lastRowUpdated, 1, 1)
        .getValue();
      var url =
        "https://hooks.slack.com/services/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";

      var payload = {
        text: ssUpdated,
      };

      var options = {
        method: "post",
        contentType: "application/json",
        payload: JSON.stringify(payload),
      };

      UrlFetchApp.fetch(url, options);

      return ContentService.createTextOutput("Done! -Mocukbot");
    } else {
      Logger.log("Something is not right.");
      return ContentService.createTextOutput("Done! -Mocukbot");
    }
  }
}

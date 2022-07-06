//Set up a variable to show when we've sent a message to Slack
var slackSentText = "Yes";
//This is hte Slack hook
var url =
  "https://hooks.slack.com/services/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";

function getNewInfo() {
  var sheetname = "SlackGooglesheetEKLE";
  var myspreadsheet = SpreadsheetApp.openById(
    "1-5INbietTNW4Tgm28PbwiwD5gGB_UayTGDAacVJVTo0"
  );
  var sheet = myspreadsheet.getSheetByName(sheetname);

  // set rows until work out how to do more elegantly...
  var startRow = 2; // First row of data to process
  var numRows = 10; // Number of rows to process
  var dataRange = sheet.getRange(startRow, 1, numRows, 11);
  var data = dataRange.getValues();

  // iterate and make variables for Slack
  for (var i = 0; i < data.length; ++i) {
    var row = data[i];
    var rowZero = row[0];
    var projectType = row[6];
    var supplierName = row[2];
    var projectName = row[3];
    var projectDescription = row[4];
    var projectStatus = row[1];
    var projectDate = row[5];
    var slackSent = row[10];

    // check if column is marked with Slack sent note and if so ignore. If not send Slack
    if (slackSent !== slackSentText) {
      // Slack bit
      var slackMessage = {
        channel: "ID-number-bot",
        username: "ID-bot",
        text:
          "\n :white_check_mark:" +
          "\n *Data1:* " +
          rowZero +
          "\n *Data2:* " +
          projectName +
          "\n *Data3:* " +
          supplierName +
          "\n *Data4:* " +
          "[" +
          projectStatus +
          "]" +
          "\n *Data5:* " +
          "_" +
          projectDescription +
          "_" +
          "\n *Data6:* " +
          projectType +
          "\n *Data7:* " +
          projectDate +
          "\n" +
          slackSent +
          // "\n Job folder string: \n" + "RCM "+jobNumber+" "+projectName +
          "\n \n",
      };

      var options = {
        method: "post",
        contentType: "application/json",
        payload: JSON.stringify(slackMessage),
      };

      UrlFetchApp.fetch(url, options);

      sheet.getRange(startRow + i, 11).setValue(slackSentText);

      // Logger.log("jobNumber:"+jobNumber)
      Logger.log(projectType);
      Logger.log(supplierName);
      Logger.log(projectName);
      Logger.log(projectDescription);
      Logger.log(projectStatus);
      Logger.log(+projectDate);
    }
  }
}

// here I take slack slack data, text parameter

function doPost(e) {
  if (typeof e !== 'undefined') {
    //need this because app script doesn't work else
    var ss = SpreadsheetApp.openById("1-5INbietTNW4Tgm28PbwiwD5gGB_UayTGDAacVJVTo0");
    var sheet = ss.getSheetByName('SlackGooglesheet');
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

    //calling EKLE and IPTAL features 
    onEdit();

    // onEditDel();

    // onEditReactions();

    // sendSlackMessages(e);


    // below is to paste back the added row to Slack Chat
    // using webhooks for that
    var lastRowUpdated = sheet.getLastRow();
    var ssUpdated = SpreadsheetApp.openById("1-5INbietTNW4Tgm28PbwiwD5gGB_UayTGDAacVJVTo0").getSheetByName("SlackGooglesheet").getRange(lastRowUpdated, 1, 1).getValue();
    var url = "https://hooks.slack.com/services/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";

    var payload = {
      text: ssUpdated
    }

    var options = {
      "method": "post",
      "contentType": "application/json",
      "payload": JSON.stringify(payload),
    };

    UrlFetchApp.fetch(url, options);

  }

  // calling reaction updating
  onEditReactions()

  return ContentService.createTextOutput('Done! -Berkobot');
}
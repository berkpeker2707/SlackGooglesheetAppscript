function sendSlackMessages(e) {
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
      //var slackDetails = [date,teamDomain,channelName,userName,bookName];
      var slackDetails = [parameterText];
  
      // paste the slack details to the sheet
      sheet.getRange(lastRow + 1, 1, 1).setValues([slackDetails]);
  
      var url = "https://hooks.slack.com/services/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";
  
      var payload = {
        text: slackDetails
      }
  
      var headers = {
        "Content-type": "application/json"
      }
  
      var options = {
        headers: headers,
        method: "POST",
        payload: JSON.stringify(payload)
      }
  
      UrlFetchApp.fetch(url, options)
  
    }
  }
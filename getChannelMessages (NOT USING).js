var ss = SpreadsheetApp.openById(
  "1-5INbietTNW4Tgm28PbwiwD5gGB_UayTGDAacVJVTo0"
);
var sheet = ss.getSheetByName("SlackGooglesheet");
var sheetEKLE = ss.getSheetByName("SlackGooglesheetEKLE");
var sheetIPTAL = ss.getSheetByName("SlackGooglesheetIPTAL");
var rangeValues = sheet.getRange("A2:B100").getValues();
var rangeValuesE = sheetEKLE.getRange("A2:B100").getValues();
var rangeValuesI = sheetIPTAL.getRange("A2:B100").getValues();

const token = "xoxb-2808091730099-2886594209472-kUTOt6Qbn3PUFoO4TOaIVed2";

var params = {
  method: "GET",
  contentType: "application/json",
  headers: { Authorization: "Bearer " + token },
  muteHttpExceptions: true,
};

function getChannelMessages() {
  var url =
    "https://slack.com/api/conversations.history?channel=C02QFNWSKSL&pretty=1";
  var response = UrlFetchApp.fetch(url, params);

  const allMessages = JSON.parse(response);
  var reactionedMessages;
  var reactionedMessagesArray = [];

  for (var i = 0; i < allMessages.messages.length; i++) {
    if (
      allMessages.messages[i].reactions &&
      allMessages.messages[i].reactions[0].name === "white_check_mark"
    ) {
      reactionedMessages = allMessages.messages[i].text;
      reactionedMessagesArray.push(reactionedMessages);
    }
  }
  // here array of checked reactions
  Logger.log(reactionedMessagesArray);
}

function removeDuplicateIPTAL() {
  var ss = SpreadsheetApp.openById(
    "1-5INbietTNW4Tgm28PbwiwD5gGB_UayTGDAacVJVTo0"
  );
  var sheetIPTAL = ss.getSheetByName("SlackGooglesheetIPTAL");

  var rng = sheetIPTAL.getRange("A3:B10000");
  var data = rng.getValues();
  var newData = new Array();
  for (i in data) {
    var row = data[i];
    var duplicate = false;
    for (j in newData) {
      if (row.join() == newData[j].join()) {
        duplicate = true;
      }
    }
    if (!duplicate) {
      newData.push(row);
    }
  }
  rng.clearContent();
  sheetIPTAL
    .getRange(3, 1, newData.length, newData[0].length)
    .setValues(newData);
}

function onEdit() {
    var ss = SpreadsheetApp.openById("1-5INbietTNW4Tgm28PbwiwD5gGB_UayTGDAacVJVTo0");
    var sheet = ss.getSheetByName('SlackGooglesheet');
    var sheetEKLE = ss.getSheetByName('SlackGooglesheetEKLE');
    var sheetIPTAL = ss.getSheetByName('SlackGooglesheetIPTAL');
    var rangeValues = sheet.getRange('A2:B100').getValues();
    var getLastRowSheetEKLE = sheetEKLE.getLastRow();
    var getLastRowSheetIPTAL = sheetIPTAL.getLastRow();
  
    var ekleList = [];
    var iptalList = [];
  
    var filteredRangeValues = rangeValues.filter(function (el) {
      return el != ",";
    });
  
    let result = filteredRangeValues[filteredRangeValues.length - 1][0].substring(0, 4);
  
    if (result === 'EKLE') {
  
      var before1 = filteredRangeValues[filteredRangeValues.length - 1][0].replace("EKLE ", "");
      var before2 = before1.replace(",", "");
      ekleList.push(before2);
  
      sheetEKLE.getRange(getLastRowSheetEKLE + 1, 1).setValues([[ekleList[ekleList.length - 1]]]);
  
    } else if (result === 'IPTA') {
  
      var before3 = filteredRangeValues[filteredRangeValues.length - 1][0].replace("IPTAL ", "");
      var before4 = before3.replace(",", "");
      iptalList.push(before4);
  
      sheetIPTAL.getRange(getLastRowSheetIPTAL + 1, 1).setValues([[iptalList[iptalList.length - 1]]]);
    } else {
      Logger.log('not in here')
    }
  
  }
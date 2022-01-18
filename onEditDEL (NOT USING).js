function onEditDel() {
    var ss = SpreadsheetApp.openById("1-5INbietTNW4Tgm28PbwiwD5gGB_UayTGDAacVJVTo0");
    var sheet = ss.getSheetByName('SlackGooglesheet');
    var sheetEKLE = ss.getSheetByName('SlackGooglesheetEKLE');
    var sheetIPTAL = ss.getSheetByName('SlackGooglesheetIPTAL');
    var rangeValues = sheet.getRange('A2:B100').getValues();
    var rangeValuesE = sheetEKLE.getRange('A2:B100').getValues();
    var rangeValuesI = sheetIPTAL.getRange('A2:B100').getValues();
  
    sheetEKLE.getRange("A2:B100").sort(1);
    sheetIPTAL.getRange("A2:B100").sort(1);
  
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
  
    let result = filteredRangeValues[filteredRangeValues.length - 1][0].substring(0, 3);
  
    if (result === 'DEL') {
  
      var before1 = filteredRangeValues[filteredRangeValues.length - 1][0].replace("DEL ", "");
      var before2 = before1.replace(",", "");
      delList.push(before2);
  
      for (i = 0; i < filteredRangeValuesE.length; i++) {
        const found = filteredRangeValuesE[i].find(element => element === delList[0]);
        if (found === delList[0]) {
          sheetEKLE.getRange(i + 2, 1).setValues([['']]);
        }
        //  else{
        Logger.log('Product not found.')
        // }
  
        // if (typeof e !== 'undefined') {
        //   var ss = SpreadsheetApp.openById("1-5INbietTNW4Tgm28PbwiwD5gGB_UayTGDAacVJVTo0");
        //   var sheet = ss.getSheetByName('SlackGooglesheetEKLE');
        //   sheet.getRange(1, 1).setValue(JSON.stringify(e));
        // }
      }
  
      for (i = 0; i < filteredRangeValuesI.length; i++) {
        const found = filteredRangeValuesI[i].find(element => element === delList[0]);
        Logger.log(found);
        Logger.log(delList[0]);
        if (found === delList[0]) {
          sheetIPTAL.getRange(i + 2, 1).setValues([['']]);
        }
        // else{
        Logger.log('Product not found.')
        // }
  
      }
    } else {
      Logger.log('not in here')
    }
    // }
  
  }
  
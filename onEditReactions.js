function onEditReactions() {
    var ss = SpreadsheetApp.openById("1-5INbietTNW4Tgm28PbwiwD5gGB_UayTGDAacVJVTo0");
    var sheet = ss.getSheetByName('SlackGooglesheet');
    var sheetEKLE = ss.getSheetByName('SlackGooglesheetEKLE');
    var sheetIPTAL = ss.getSheetByName('SlackGooglesheetIPTAL');
    var rangeValues = sheet.getRange('A2:B100').getValues();
    var rangeValuesE = sheetEKLE.getRange('A2:B100').getValues();
    var rangeValuesI = sheetIPTAL.getRange('A2:B100').getValues();
  
    var ekleList = [];
    var iptalList = [];
    // var totalList = [];
    var reactionedMessagesArrayList = []
  
    const token = "xoxb-2808091730099-2886594209472-kUTOt6Qbn3PUFoO4TOaIVed2";
    var url = 'https://slack.com/api/conversations.history?channel=C02QFNWSKSL&pretty=1';
  
    var params = {
      method: "GET",
      contentType: 'application/json',
      headers: { Authorization: "Bearer " + token },
      muteHttpExceptions: true
    };
  
    var response = UrlFetchApp.fetch(url, params);
  
    const allMessages = JSON.parse(response);
    var reactionedMessages;
    var reactionedMessagesArray = [];
  
    for (var i = 0; i < allMessages.messages.length; i++) {
      if (allMessages.messages[i].reactions && allMessages.messages[i].reactions[0].name === 'white_check_mark') {
        reactionedMessages = allMessages.messages[i].text
        reactionedMessagesArray.push(reactionedMessages)
      }
    }
  
    // here array of checked reactions
    // Logger.log(reactionedMessagesArray)
  
    //filtering for ',', which comes from spreadsheet if the cell is empty
    var filteredRangeValues = rangeValues.filter(function (el) {
      return el != ",";
    });
  
    var filteredrangeValuesE = rangeValuesE.filter(function (el) {
      return el != ",";
    });
  
    var filteredrangeValuesI = rangeValuesI.filter(function (el) {
      return el != ",";
    });
  
    //removing EKLE prefix
    for (i = 0; i < filteredrangeValuesE.length; i++) {
      var before1 = filteredrangeValuesE[i][0].replace("EKLE ", "");
      var before2 = before1.replace(",", "");
      ekleList.push(before2);
    }
  
    //removing IPTAL prefix
    for (i = 0; i < filteredrangeValuesI.length; i++) {
      var before3 = filteredrangeValuesI[i][0].replace("IPTAL ", "");
      var before4 = before3.replace(",", "");
      iptalList.push(before4);
    }
  
    // //total array of elements of SlackGooglesheetEKLE & SlackGooglesheetIPTAL 
    // totalList = ekleList.concat(iptalList);
    // Logger.log(totalList)
  
    for (i = 0; i < reactionedMessagesArray.length; i++) {
      var before5 = reactionedMessagesArray[i].replace("EKLE ", "").replace("IPTAL ", "");
      reactionedMessagesArrayList.push(before5);
    }
  
    // Logger.log(reactionedMessagesArrayList)
  
    //filtered from reactions
    ekleList = ekleList.filter(function (item) {
      return !reactionedMessagesArrayList.includes(item);
    })
  
    iptalList = iptalList.filter(function (item) {
      return !reactionedMessagesArrayList.includes(item);
    })
  
    Logger.log(reactionedMessagesArrayList);
  
    // Logger.log(filteredrangeValuesE)
    Logger.log(filteredrangeValuesI)
  
    // Logger.log(ekleList)
    Logger.log(iptalList)
  
    for (i = 0; filteredrangeValuesE.length; i++) {
      sheetEKLE.getRange(i + 2, 1).setValue([[ekleList[i]]]);
  
      if (i === 200)
        break;
    }
  
    for (i = 0; filteredrangeValuesI.length; i++) {
      sheetIPTAL.getRange(i + 2, 1).setValue([[iptalList[i]]]);
  
      if (i === 200)
        break;
    }
  
  }
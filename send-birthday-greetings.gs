function onOpen(e) {
  // Add a custom menu to the spreadsheet.

  SpreadsheetApp.getUi() // Or DocumentApp, SlidesApp, or FormApp.
      .createMenu('Birthday')
      .addItem('Send Greetings', 'sendEmail')
      .addToUi();
  
  sendEmail();
}

function sendEmail(){
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const ui = SpreadsheetApp.getUi();
    
  var startRow = 2; // First row of data to process
  //(starting row index, starting column index, # or rows, # of columns)
  var dataRange = sheet.getRange(startRow, 1, sheet.getLastRow()-1,4);

  
  // Fetch values for each row in the Range.
  var data = dataRange.getValues();
  
  //Logger.log(data);

  var name;
  var birthdate;
  var emailAddress;

  var today = new Date();

  var rowNum=2;
  for (var i in data) {
    var row = data[i];
     
    name = row[0];
    birthdate = row[1];
    emailAddress = row[2];
    Logger.log(" i = "+i);
    /*
    Logger.log("today.getDay() "+today.getDate()+" today.getMonth() "+today.getMonth()+"\n");
    Logger.log("birthdate.getDay() "+birthdate.getDate()+" birthdate.getMonth() "+birthdate.getMonth()+"\n");
    */
    Logger.log("name "+name+" email "+emailAddress+" birthdate "+birthdate);
    if((today.getDate()==birthdate.getDate()) && (today.getMonth()==birthdate.getMonth())){
        
        Logger.log("name "+name+" email "+emailAddress+" birthdate "+birthdate);
        var body = "Dear friend, "+name+"\n\n"+
                "Wish you a very happy birthday\n\n"+                
                "Best Wishes,";
        var subject = 'Birthday Greetings';
        
        if(emailAddress!=null){
            MailApp.sendEmail(emailAddress, subject, body);
            sheet.getRange(rowNum, 4,1,1).setValue("Birthday Greeting Sent at "+new Date());            
        }
    } 
    rowNum++;   
  }  
}

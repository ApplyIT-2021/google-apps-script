function checkWebsite() {
  // Replace URL with client's website URL
  var url = 'https://www.google.com';
  var response;
  try {
    //If server is not running, it will throw exception
    response = UrlFetchApp.fetch(url); 
    var content = response.getContentText();
    // Update this with the exact text you're searching for
    var searchText = "Google Search"; 

    // if (content.indexOf(searchText) !== -1) {
    if (content.indexOf(searchText) === -1) {
      sendEmail(url, "Server is running but web app is not running");
    }
  } catch (error) {
    sendEmail(url, "Server is not running or not reachable");
  }
}
function sendEmail(url, detail) {
  // Replace with your email address
  var emailAddress = 'applyit.2021@gmail.com'; 
  var subject = 'Website Check Alert'+" for "+url;
  // Get the current timestamp
  var timestamp = new Date().toLocaleString();

  var message = 'The website ' + url + " appears not working at "+timestamp+" Reason: "+detail;
  MailApp.sendEmail(emailAddress, subject, message);
}

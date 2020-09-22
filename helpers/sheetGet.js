// TODO figure out how to get spreadsheet ID dynamically
const getSpreadsheetId = () => {
  // This is the regex to get the spreadsheet from the URL
  const spreadsheetRegex = '/spreadsheets/d/([a-zA-Z0-9-_]+)';
  // still don't know how to get the URL
};

// TODO add meaningful success and error handling
// TODO this only GETs data. Need to post.
// TODO need to allow users to select what spreadsheet they want to use
const getSpreadsheet = () => {
  window.gapi.client.load('sheets', 'v4', () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: '', // Need to find how to get this dynamically
        range: 'Sheet1!A1:D4'
      })
      .then(
        (response) => response.result.values,
        (response) =>
          // Fix to use state instead of callback
          response
      );
  });
};

export default getSpreadsheet;

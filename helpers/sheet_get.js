// TODO figure out how to get spreadsheet ID dynamically
const getSpreadsheetId = () => {
  const spreadsheetRegex = '/spreadsheets/d/([a-zA-Z0-9-_]+)';
  window.gapi.client.sheets.spreadsheets.values
    .update({
      spreadsheetId: '1kPRIKVMmYZPp4E6oZgeQnJ3AdE0ECo9DP45-WQqM7DY', // The sheet's ID. Not sure how to get this programmatically
      range: 'Sheet1!A1', // The range of cells we're working with. Could be the entire sheet like it is here
      valueInputOption: 'RAW', // one of RAW or USER_ENTERED.
      resource: { values }
    })
    .then((response) => {
      const { result } = response;
      console.log('result is:', result);
      console.log(`${result.updatedCells} cells updated.`);
    });
};

// TODO add meaningful success and error handling
// TODO this only GETs data. Need to post.
// TODO this only works with truly puclic spreadsheets
// TODO need to allow users to select what spreadsheet they want to use
const load = (callback) => {
  window.gapi.client.load('sheets', 'v4', () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: sheetID,
        range: 'Sheet1!A1:D4'
      })
      .then(
        (response) => {
          console.log(response);
          const data = response.result.values;
          // Fix to use state instead of callback
          callback({
            data
          });
        },
        (response) => {
          // Fix to use state instead of callback
          callback(false, response.result.error);
        }
      );
  });
};

export default load;

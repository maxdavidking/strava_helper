const sheetID = '11vhPCWxvLs627X68lTuneyg3mOJDn0nH1YY08VvAuH8';

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

// TODO is it possible to just append data to wherever the end is?
// TODO This is where we are at.
// Example below
const values = [
  ['Item', 'Cost', 'Stocked', 'Ship Date'],
  ['Wheel', '$20.50', '4', '3/1/2016'],
  ['Door', '$15', '2', '3/15/2016'],
  ['Engine', '$100', '1', '3/20/2016'],
  ['Totals', '=SUM(B2:B4)', '=SUM(C2:C4)', '=MAX(D2:D4)']
  // Additional rows ...
];

// Example below
const body = {
  range: 'Sheet1!A1:D5', // Specify range of where to write
  majorDimension: 'ROWS', // Specify rows or columns depending on how you want to write
  values
};

// Need to get the spreadsheet ID, the range of cells, the values to send and whether
// to send raw or formatted
// TODO this is throwing an error "request is missing required authentication credential"
const sendData = () => {
  window.gapi.client.sheets.spreadsheets.values
    .update({
      spreadsheetId: '1kPRIKVMmYZPp4E6oZgeQnJ3AdE0ECo9DP45-WQqM7DY', // The sheet's ID. Not sure how to get this programmatically
      range: 'Sheet1!A1', // The range of cells we're working with. Could be the entire sheet like in the example.
      valueInputOption: 'RAW', // one of RAW or USER_ENTERED.
      resource: [['123']] // The values to send.
    })
    .then((response) => {
      const { result } = response;
      console.log(`${result.updatedCells} cells updated.`);
    });
};

export default sendData;

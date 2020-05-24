// TODO is it possible to just append data to wherever the end is?

// Need to somehow init the gapi value below
const init = () => {
  console.log('init gapi');
};

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
const sendData = () => {
  gapi.client.sheets.spreadsheets.values
    .update({
      spreadsheetId: '1YngoQHyjw4YyMmwQ9VPXseu01aTBJsyqg_zuc7H2vlk', // The sheet's ID. Not sure how to get this programmatically
      range: 'Sheet1', // The range of cells we're working with. Could be the entire sheet like in the example.
      valueInputOption: 'RAW', // one of RAW or USER_ENTERED.
      resource: body // The values to send.
    })
    .then((response) => {
      const { result } = response;
      console.log(`${result.updatedCells} cells updated.`);
    });
};

export default { init, sendData };

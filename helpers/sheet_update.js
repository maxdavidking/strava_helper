// Example below of format for send data on spreadsheet update
// const values = [
//   ['Item', 'Cost', 'Stocked', 'Ship Date'],
//   ['Wheel', '$20.50', '4', '3/1/2016'],
//   ['Door', '$15', '2', '3/15/2016'],
//   ['Engine', '$100', '1', '3/20/2016'],
//   ['Totals', '=SUM(B2:B4)', '=SUM(C2:C4)', '=MAX(D2:D4)']
//   Additional rows ...
// ];

// Need to get the spreadsheet ID, the range of cells, the values to send and whether
// to send raw or formatted
const sendData = (values) => {
  window.gapi.client.sheets.spreadsheets.values
    .update({
      spreadsheetId: '1kPRIKVMmYZPp4E6oZgeQnJ3AdE0ECo9DP45-WQqM7DY', // The sheet's ID. Not sure how to get this programmatically
      range: 'Sheet1!A1', // The range of cells we're working with. Could be the entire sheet like it is here
      valueInputOption: 'RAW', // one of RAW or USER_ENTERED.
      // The values to send. Needs to be format:
      // { values: [
      // [row-1-col-1, row-1-col-2],
      // [row-2-col-1, row-2-col-2],
      // [row-3-col-1, row-3-col2],
      // [etc...]
      // ] }
      resource: { values }
    })
    .then((response) => {
      const { result } = response;
      return result;
    });
};

export default sendData;

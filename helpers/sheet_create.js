// Example below of format for send data
// const values = [
//   ['Item', 'Cost', 'Stocked', 'Ship Date'],
//   ['Wheel', '$20.50', '4', '3/1/2016'],
//   ['Door', '$15', '2', '3/15/2016'],
//   ['Engine', '$100', '1', '3/20/2016'],
//   ['Totals', '=SUM(B2:B4)', '=SUM(C2:C4)', '=MAX(D2:D4)']
//   Additional rows ...
// ];

const formatDataForSheet = (values) => {
  console.log(values);
  // do something with values
  return formattedValues;
};
const createSheetAndSendData = (values) => {
  const spreadsheetBody = formatDataForSheet(values);

  const request = window.gapi.client.sheets.spreadsheets.create({}, spreadsheetBody);
  request.then(
    (response) => {
      // TODO: Change code below to process the `response` object:
      console.log('response is:', response);
      console.log('result is:', response.result);
      return response.result;
    },
    (reason) => {
      console.error(`error: ${reason.result.error.message}`);
      return reason.result.error.message;
    }
  );
};

export default createSheetAndSendData;

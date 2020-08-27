import defaultSheet from './default_sheet';

const formatDataForSheet = (rawStravaValues) => {
  const formattedValues = rawStravaValues.map((value) => {
    const rowObject = {
      values: [
        { userEnteredValue: { stringValue: value.name } },
        {
          userEnteredValue: { stringValue: value.start_date },
          userEnteredFormat: {
            numberFormat: {
              type: 'DATE',
              pattern: 'dd/mm/yyyy'
            }
          }
        },
        { userEnteredValue: { numberValue: value.distance } },
        { userEnteredValue: { numberValue: value.moving_time } }
      ]
    };
    return rowObject;
  });
  return formattedValues;
};

const addDataToSpreadsheetBody = (formattedStravaValues) => {
  console.log(defaultSheet);
  formattedStravaValues.forEach((arrayOfvalues) => {
    defaultSheet.sheets[0].data[0].rowData.push(arrayOfvalues);
  });
  console.log('data to send:', defaultSheet);
  return defaultSheet;
};

const createSheetAndSendData = (rawStravaValues) => {
  const formattedStravaValues = formatDataForSheet(rawStravaValues);
  const spreadsheetBody = addDataToSpreadsheetBody(formattedStravaValues);
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

import { cloneDeep } from 'lodash';
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
  const deepCopyOfDefaultSheet = cloneDeep(defaultSheet);
  formattedStravaValues.forEach((arrayOfvalues) => {
    deepCopyOfDefaultSheet.sheets[0].data[0].rowData.push(arrayOfvalues);
  });
  return deepCopyOfDefaultSheet;
};

const createSheetAndSendData = (rawStravaValues) => {
  const formattedStravaValues = formatDataForSheet(rawStravaValues);
  const spreadsheetBody = addDataToSpreadsheetBody(formattedStravaValues);
  const request = window.gapi.client.sheets.spreadsheets.create({}, spreadsheetBody);
  request.then(
    (response) =>
      // TODO: Change code below to process the `response` object:
      response.result,
    (reason) =>
      // TODO handle errors
      reason.result.error.message

  );
};

export default createSheetAndSendData;

import { cloneDeep } from 'lodash';
import defaultSheet from './defaultSheet';

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

const createSheetAndSendData = async (rawStravaValues) => {
  const formattedStravaValues = formatDataForSheet(rawStravaValues);
  const spreadsheetBody = addDataToSpreadsheetBody(formattedStravaValues);
  const request = window.gapi.client.sheets.spreadsheets.create({}, spreadsheetBody);
  await request
    .then((response) => response.result.properties.title)
    .catch((reason) => {
      const error = reason.result.error.message;
      return error;
    });
};

export default createSheetAndSendData;

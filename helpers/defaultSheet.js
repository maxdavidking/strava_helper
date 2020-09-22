// Example below of format for send data on spreadsheet create
const date = new Date();
const dateToday = date.toDateString();

const defaultSheet = {
  properties: {
    // Title of spreadsheet
    title: `Data From Strava ${dateToday}`
  },
  sheets: [
    {
      data: [
        {
          startRow: 0,
          startColumn: 0,
          rowData: [
            {
              values: [
                {
                  userEnteredValue: {
                    stringValue: 'Name'
                  }
                },
                {
                  userEnteredValue: {
                    stringValue: 'Date'
                  }
                },
                {
                  userEnteredValue: {
                    stringValue: 'Distance'
                  }
                },
                {
                  userEnteredValue: {
                    stringValue: 'Moving Time'
                  }
                }
              ]
            }
            // Data from Strava is added here
          ]
        }
      ]
    }
  ]
};

export default defaultSheet;

// Example below of format for send data on spreadsheet create
const defaultSheet = {
  properties: {
    // Title of spreadsheet
    // TODO add date here
    title: 'Data From Strava Interpolate Date Here'
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

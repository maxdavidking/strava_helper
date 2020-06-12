import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// TODO find out which way to actually sendData. Two different methods in two
// helper functions below
import load from '../helpers/sheet_get';
import sendData from '../helpers/sheet_update';

const APIKEY = 'AIzaSyCf1gZibxEzSxslhAGUwWlNFGzJIhZLmfo';

const StravaDataToGoogleSheets = ({ stravaUserId, userRunCount, userActivities }) => {
  const [activityData, setActivityData] = useState({});
  const [hasError, setHasError] = useState({});

  // THIS METHOD REQUIRES THAT THE USER MAKE THE SHEET PUBLIC SEPARATE FROM THIS APP
  const initClient = () => {
    // 2. Initialize the JavaScript client library.
    window.gapi.client
      .init({
        apiKey: APIKEY,
        // Your API key will be automatically added to the Discovery Document URLs.
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4']
      })
      .then(() => {
        // 3. Initialize and make the API request.
        sendData();
      });
  };

  const sendDataToSheets = () => {
    // Load gapi window object
    console.log(window.gapi);
    window.gapi.load('client', initClient);
  };

  return (
    <>
      <h3>Strava to Google Sheets</h3>
      <p>Every time you upload a run to Strava it will also write to a specified Google Sheet</p>
      <button type="button" onClick={sendDataToSheets}>
        Send Data To Google Sheets
      </button>
    </>
  );
};

export default StravaDataToGoogleSheets;

StravaDataToGoogleSheets.propTypes = {
  userActivities: PropTypes.array.isRequired,
  userRunCount: PropTypes.number.isRequired,
  stravaUserId: PropTypes.number.isRequired
};

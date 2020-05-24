import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import load from '../helpers/sheet_get';

const APIKEY = 'AIzaSyCf1gZibxEzSxslhAGUwWlNFGzJIhZLmfo';

const StravaDataToGoogleSheets = ({ stravaUserId, userRunCount, userActivities }) => {
  const [activityData, setActivityData] = useState({});
  const [hasError, setHasError] = useState({});

  useEffect(() => {
    const onLoad = (data, error) => {
      if (data) {
        const { cars } = data;
        setActivityData({ cars });
      } else {
        setHasError({ error });
      }
    };
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
          load(onLoad);
        });
    };
    // Load gapi window object
    console.log(window.gapi);
    window.gapi.load('client', initClient);
  }, []);

  return (
    <>
      <h3>Strava to Google Sheets</h3>
      <p>Every time you upload a run to Strava it will also write to a specified Google Sheet</p>
    </>
  );
};

export default StravaDataToGoogleSheets;

StravaDataToGoogleSheets.propTypes = {
  userActivities: PropTypes.array.isRequired,
  userRunCount: PropTypes.number.isRequired,
  stravaUserId: PropTypes.number.isRequired
};

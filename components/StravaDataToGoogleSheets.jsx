import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StravaDataToGoogleSheets = ({ stravaUserId, userRunCount, userActivities }) => (
  <>
    <h3>Strava to Google Sheets</h3>
    <p>Every time you upload a run to Strava it will also write to a specified Google Sheet</p>
  </>
);

export default StravaDataToGoogleSheets;

StravaDataToGoogleSheets.propTypes = {
  userActivities: PropTypes.array.isRequired,
  userRunCount: PropTypes.number.isRequired,
  stravaUserId: PropTypes.number.isRequired
};

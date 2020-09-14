import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import createSheetAndSendData from '../helpers/sheet_create';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem;
`;

const Body = styled.p`
  text-align: center;
`;

const GoogleSheetsButton = styled.button`
  margin: 1rem;
`;

const StravaDataToGoogleSheets = ({ stravaUserId, userRunCount, userActivities }) => {
  const [activityData, setActivityData] = useState({});
  const [hasError, setHasError] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const initClient = () => {
      // 2. Pass in api keys for authentication
      window.gapi.client
        .init({
          apiKey: 'AIzaSyCf1gZibxEzSxslhAGUwWlNFGzJIhZLmfo',
          // Your API key will be automatically added to the Discovery Document URLs.
          discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
          scope: 'https://www.googleapis.com/auth/spreadsheets',
          clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
        })
        .then(() => {
          // Listen for sign-in state changes.
          window.gapi.auth2.getAuthInstance().isSignedIn.listen();
        });
    };
    // 1. Init the gapi client
    window.gapi.load('client:auth2', initClient);
  }, [isLoggedIn]);

  const handleSignInClick = () => {
    window.gapi.auth2.getAuthInstance().signIn();
    setIsLoggedIn(true);
  };

  const handleSignOutClick = () => {
    window.gapi.auth2.getAuthInstance().signOut();
    setIsLoggedIn(false);
  };

  return (
    <Wrapper>
      <h2>Strava to Google Sheets</h2>
      <Body>Dump your Strava activities into a new spreadsheet</Body>
      {isLoggedIn ? (
        <GoogleSheetsButton type="button" onClick={handleSignOutClick}>
          Sign Out Of Google Sheets
        </GoogleSheetsButton>
      ) : (
        <GoogleSheetsButton type="button" onClick={handleSignInClick}>
          Sign In To Google Sheets
        </GoogleSheetsButton>
      )}
      {isLoggedIn && (
        // TODO this should only render AFTER google Oauth completes
        <button type="button" onClick={() => createSheetAndSendData(userActivities)}>
          Send Your Data To Google Sheets
        </button>
      )}
    </Wrapper>
  );
};

export default StravaDataToGoogleSheets;

StravaDataToGoogleSheets.propTypes = {
  userActivities: PropTypes.array.isRequired,
  userRunCount: PropTypes.number.isRequired,
  stravaUserId: PropTypes.number.isRequired
};

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Error from './Error';
import createSheetAndSendData from '../helpers/sheetCreate';

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

const Confirmation = styled.div`
  margin: 1rem;
  color: #3dd16b;
`;

const StravaDataToGoogleSheets = ({ userActivities }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [status, setStatus] = useState('');

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
  }, []);

  const handleSignInClick = () => {
    window.gapi.auth2.getAuthInstance().signIn();
    setIsLoggedIn(true);
  };

  const handleSignOutClick = () => {
    window.gapi.auth2.getAuthInstance().signOut();
    setIsLoggedIn(false);
  };

  const handleSheetCreate = () => {
    createSheetAndSendData(userActivities);
    setStatus('success');
  };

  if (status === 'error') {
    return <Error />;
  }

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
        <button type="button" onClick={handleSheetCreate}>
          Send Your Data To Google Sheets
        </button>
      )}
      {status === 'success' && <Confirmation>File Sent</Confirmation>}
    </Wrapper>
  );
};

export default StravaDataToGoogleSheets;

StravaDataToGoogleSheets.propTypes = {
  userActivities: PropTypes.array.isRequired
};

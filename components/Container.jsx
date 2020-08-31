import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styled from 'styled-components';
import Loading from './Loading';
import Error from './Error';
import StravaDataDashboard from './StravaDataDashboard';
import StravaDataToGoogleSheets from './StravaDataToGoogleSheets';
import StravaRunExplorer from './StravaRunExplorer';
import StravaDataViz from './StravaDataViz';
import AuthorizeStravaPrompt from './AuthorizeStravaPrompt';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Actions = styled.div`
  display: flex;
`;

const Container = () => {
  // TODO redirect to base URL once the code from Strava is captured
  const [stravaUserId, setStravaUserId] = useState('');
  const [stravaOauthCode, setStravaOauthCode] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState(1);
  const [userRunCount, setUserRunCount] = useState(false);
  const [userActivities, setUserActivities] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const {
    query: { code }
  } = useRouter();

  const refreshUrl = 'https://www.strava.com/api/v3/oauth/token';
  const baseUrl = 'https://www.strava.com/api/v3';
  const allActivitiesUrl = '/athlete/activities';
  // TODO need to hide these values from the front-end

  // This sets up the initial access token information
  useEffect(() => {
    console.log('getting access token');
    setStravaOauthCode(code);
    axios
      .post('https://www.strava.com/api/v3/oauth/token', {
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: stravaOauthCode
      })
      .then((response) => {
        setRefreshToken(response.data.refresh_token);
        setAccessToken(response.data.access_token);
        setStravaUserId(response.data.athlete.id);
      })
      // Add error handling. If there is no response this app won't work
      .catch(() => {
        setStravaUserId(false);
      });
  }, [code, stravaOauthCode]);

  // TODO put into it's own component?
  // TODO not sure this is working correctly
  useEffect(() => {
    // Need to make a request to Strava to check that the access token hasn't
    // expired. Expires every 6 hours. Need the client_id, client_secret, which is
    // unique to the app and the refresh token, which is unique to each person.
    // TODO check if this actually checks if refreshToken is expired and fix the
    // hack of setting refreshToken default to 1
    console.log('setting refresh token');
    if (refreshToken <= 0) {
      axios
        .post(`${refreshUrl}`, {
          client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
          client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        })
        // Add success handling. Need to update the access token from the response.
        .then((response) => {
          setAccessToken(response.data.access_token);
        })
        // Add error handling. If there is no response this app won't work
        .catch(() => {
          setAccessToken('');
        });
    }
  }, [refreshToken]);

  // TODO put into it's own component?
  // Gets user data
  useEffect(() => {
    console.log('getting user data');
    if (stravaUserId) {
      const athleteStatsUrl = `/athletes/${stravaUserId}/stats`;
      // get Athlete
      axios
        .get(`${baseUrl}${athleteStatsUrl}`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
        .then((response) => {
          const {
            data: {
              recent_run_totals: { count }
            }
          } = response;
          setUserRunCount(count);
        })
        .catch(() => {
          setUserRunCount(false);
        });
      // get Athlete activities
      axios
        .get(`${baseUrl}${allActivitiesUrl}?per_page=30`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
        .then((response) => {
          const { data } = response;
          console.log(data);
          setUserActivities(data);
        })
        .catch(() => {
          setUserActivities(false);
        });
    }
  }, [accessToken, refreshToken, stravaUserId]);

  // TODO add loading handling and CSS
  if (isLoading) {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
  }

  // TODO add error handling and CSS
  if (hasError) {
    return (
      <Wrapper>
        <Error />
      </Wrapper>
    );
  }

  // TODO add error handling and CSS
  if (!stravaUserId) {
    return (
      <Wrapper>
        <AuthorizeStravaPrompt setIsLoading={setIsLoading} setHasError={setHasError} />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Actions>
        <StravaDataToGoogleSheets
          stravaUserId={stravaUserId}
          userRunCount={userRunCount}
          userActivities={userActivities}
        />
        <StravaDataViz
          stravaUserId={stravaUserId}
          userRunCount={userRunCount}
          userActivities={userActivities}
        />
        <StravaRunExplorer
          stravaUserId={stravaUserId}
          userRunCount={userRunCount}
          userActivities={userActivities}
        />
      </Actions>
      <StravaDataDashboard
        stravaUserId={stravaUserId}
        userRunCount={userRunCount}
        userActivities={userActivities}
      />
    </Wrapper>
  );
};

export default Container;

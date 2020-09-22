import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styled from 'styled-components';
import Error from './Error';
import Loading from './Loading';
import StravaDataDashboard from './StravaDataDashboard';
import StravaDataToGoogleSheets from './StravaDataToGoogleSheets';
import AuthorizeStravaPrompt from './AuthorizeStravaPrompt';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Actions = styled.div`
  display: flex;

  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

const Container = () => {
  const [stravaUserId, setStravaUserId] = useState('');
  const [stravaOauthCode, setStravaOauthCode] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState(1);
  const [userRunCount, setUserRunCount] = useState(0);
  const [userActivities, setUserActivities] = useState([]);
  const [status, setStatus] = useState('');
  const {
    query: { code }
  } = useRouter();

  const refreshUrl = 'https://www.strava.com/api/v3/oauth/token';
  const baseUrl = 'https://www.strava.com/api/v3';
  const allActivitiesUrl = '/athlete/activities';

  // This sets strava code to fetch data
  useEffect(() => {
    if (code) {
      setStravaOauthCode(code);
    }
  }, [code]);

  // This gets the basic strava data for the user
  useEffect(() => {
    if (stravaOauthCode) {
      setStatus('loading');
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
          setStatus('');
        })
        .catch(() => {
          setStravaUserId('');
          setStatus('');
        });
    }
  }, [stravaOauthCode]);

  // Need to make a request to Strava to check that the access token hasn't
  // expired. Expires every 6 hours. Need the client_id, client_secret, which is
  // unique to the app and the refresh token, which is unique to each person.
  // TODO check if this actually checks if refreshToken is expired and fix the
  // hack of setting refreshToken default to 1
  useEffect(() => {
    if (refreshToken <= 0) {
      axios
        .post(`${refreshUrl}`, {
          client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
          client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        })
        .then((response) => {
          setAccessToken(response.data.access_token);
        })
        .catch(() => {
          setStatus('error');
          setAccessToken('');
        });
    }
  }, [refreshToken]);

  // Gets user data after they've authenticated
  useEffect(() => {
    if (stravaUserId) {
      const athleteStatsUrl = `/athletes/${stravaUserId}/stats`;
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
      axios
        .get(`${baseUrl}${allActivitiesUrl}?per_page=30`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
        .then((response) => {
          const { data } = response;
          setUserActivities(data);
        })
        .catch(() => {
          setUserActivities(false);
        });
    }
  }, [accessToken, refreshToken, stravaUserId]);

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'error') {
    return <Error />;
  }

  // Prompt user to log in with Strava if they haven't already
  if (!stravaUserId) {
    return (
      <Wrapper>
        <AuthorizeStravaPrompt />
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
        {/* TODO Add these in when built
        <StravaDataViz />
        <StravaRunExplorer /> */}
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

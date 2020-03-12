import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const StravaApi = () => {
  const [stravaId, setStravaId] = useState('Unefined');
  const [stravaCode, setStravaCode] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState(1);
  const [userRunCount, setUserRunCount] = useState('Loading....');
  const [lastActivity, setLastActivity] = useState('Loading...');
  const { query: { code } } = useRouter();

  useEffect(() => {
    const refreshUrl = 'https://www.strava.com/api/v3/oauth/token';
    const baseUrl = 'https://www.strava.com/api/v3';
    const athleteStatsUrl = `/athletes/${stravaId}/stats`;
    const allActivitiesUrl = '/athlete/activities';
    setStravaCode(code);

    // Fix the conditional logic to post this
    if (!refreshToken && !accessToken && !stravaId) {
      axios
        .post('https://www.strava.com/api/v3/oauth/token', {
          client_id: '44378',
          client_secret: '68d0196721ef3be5a5907b8436ed965bd35e2a36',
          grant_type: 'authorization_code',
          code: stravaCode
        })
        // Add success handling. Need to update the access token from the response.
        .then((response) => {
          setRefreshToken(response.data.access_token);
          setAccessToken(response.data.access_token);
          setStravaId(response.data.athlete.id);
        })
        // Add error handling. If there is no response this app won't work
        .catch((error) => {
          console.log('oauth post error', error);
        });
    }
    // Need to make a request to Strava to check that the access token hasn't
    // expired. Expires every 6 hours. Need the client_id, client_secret and
    // refresh token, which are unique to each person.
    // TODO check if this actually checks if refreshToken is expired and fix the
    // hack of setting refreshToken default to 1
    if (refreshToken <= 0) {
      console.log('hello from refresh token');
      axios
        .post(`${refreshUrl}`, {
          client_id: '44378',
          client_secret: '68d0196721ef3be5a5907b8436ed965bd35e2a36',
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

    if (stravaId) {
      // get Athlete
      axios
        .get(`${baseUrl}${athleteStatsUrl}`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
        .then((response) => {
          const { data: { recent_run_totals: { count } } } = response;
          setUserRunCount(count);
        })
        .catch(() => {
          setUserRunCount('Error!');
        });
      // get Athlete activities
      axios
        .get(`${baseUrl}${allActivitiesUrl}?per_page=30`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
        .then((response) => {
          const { data } = response;
          setLastActivity(data[0].resource_state);
        })
        .catch(() => {
          setLastActivity('Error!');
        });
    }
  }, [accessToken, refreshToken, stravaCode, stravaId, code]);

  return (
    <div>
      <div>
        Your strava id is:
        {stravaId}
        Your run count is:
        {userRunCount}
        Your last activity is:
        {lastActivity}
      </div>
      <a href="https://www.strava.com/oauth/authorize?client_id=44378&redirect_uri=http://localhost:3003&response_type=code&scope=activity:read_all">
        Authorize!
      </a>
    </div>
  );
};

export default StravaApi;

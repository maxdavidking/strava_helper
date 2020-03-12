import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StravaApi = () => {
  const [stravaId, setStravaId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [userRunCount, setUserRunCount] = useState('Loading....');
  const [lastActivity, setLastActivity] = useState('Loading...');

  useEffect(() => {
    const refreshUrl = 'https://www.strava.com/api/v3/oauth/token';
    const baseUrl = 'https://www.strava.com/api/v3';
    const athleteUrl = '/athlete';
    const athleteStatsUrl = `/athletes/${stravaId}/stats`;
    const lastActivityUrl = `/athletes/${stravaId}/activities`;

    // Need to make a request to Strava to check that the access token hasn't
    // expired. Expires every 6 hours. Need the client_id, client_secret and
    // refresh token, which are unique to each person.
    axios
      .post(`${refreshUrl}`, {
        client_id: '44378',
        client_secret: '68d0196721ef3be5a5907b8436ed965bd35e2a36',
        grant_type: 'refresh_token',
        refresh_token: '5a5936fa97fe9240dec43f002d0b1561f8315425'
      })
      // Add success handling. Need to update the access token from the response.
      .then((response) => {
        setAccessToken(response.data.access_token);
      })
      // Add error handling. If there is no response this app won't work
      .catch(() => {
        setAccessToken('');
      });

    if (accessToken) {
      axios
        .get(`${baseUrl}${athleteUrl}`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
        .then((response) => {
          const { id } = response.data;
          setStravaId(id);
        })
        .catch(() => {
          setStravaId('');
        });
    }

    if (stravaId) {
      axios
        .get(`${baseUrl}${athleteStatsUrl}`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
        .then((response) => {
          const { data: { recent_run_totals: count } } = response;
          setUserRunCount(count);
        })
        .catch(() => {
          setUserRunCount('Error!');
        });
      // TODO: Need to fix activities search
      axios
        .get(`${baseUrl}${lastActivityUrl}`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
        .then((response) => {
          const { data } = response;
          console.log(response);
          setLastActivity(data);
        })
        .catch(() => {
          setLastActivity('Error!');
        });
    }
  }, [stravaId, accessToken]);
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
    </div>
  );
};

export default StravaApi;

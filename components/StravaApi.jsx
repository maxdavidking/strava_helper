import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StravaApi = () => {
  // Need to make a request to Strava to check that the access token hasn't
  // expired. Expires seemingly every 6 hours
  const [stravaId, setStravaId] = useState('');
  const [accessToken, setAccessToken] = useState('')
  const [userStats, setUserStats] = useState('None');
  const [lastActivity, setLastActivity] = useState('None');

  useEffect(() => {
    const refreshUrl = 'https://www.strava.com/api/v3/oauth/token'
    const baseUrl = 'https://www.strava.com/api/v3';
    const athleteUrl = '/athlete';
    const athleteStatsUrl = `/athletes/${stravaId}/stats`;
    const lastActivityUrl = `/athletes/${stravaId}/activities`;
    // the client_id, client_secret and refresh token are unique to each person.
    // They are all required to update the accessToken, which is required to get any data
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
        console.log(response);
      })
      // Add error handling. If there is no response this app won't work
      .catch((error) => {
        console.log(error);
      });

    if (accessToken) {
      axios
        .get(`${baseUrl}${athleteUrl}`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
        .then((response) => {
          const { id } = response.data;
          console.log(response);
          setStravaId(id);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (stravaId) {
      axios
        .get(`${baseUrl}${athleteStatsUrl}`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
        .then((response) => {
          const data = response.data.recent_run_totals.count;
          console.log(response);
          setUserStats(data);
        })
        .catch((error) => {
          console.log(error);
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
        .catch((error) => {
          console.log(error);
        });
    }
  }, [stravaId, accessToken]);
  return (
    <div>
      <div>
        Your strava id is:

      </div>
    </div>
  );
};

export default StravaApi;

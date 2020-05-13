import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styled from 'styled-components';
import Link from 'next/link';
import Loading from './Loading';
import Error from './Error';

const Grid = styled.div`
  display: grid;
`;

const DataPoint = styled.div`
  margin: 0.5em;
`;
const StravaWrapper = () => {
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
  const clientId = '44378';
  const clientSecret = '68d0196721ef3be5a5907b8436ed965bd35e2a36';

  // This sets up the initial access token information
  useEffect(() => {
    console.log('getting access token');
    setStravaOauthCode(code);
    axios
      .post('https://www.strava.com/api/v3/oauth/token', {
        client_id: clientId,
        client_secret: clientSecret,
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

  const formatMetresToKilometres = (metres) => {
    const kilometres = metres / 1000;
    const roundedKilometres = Math.round((kilometres + Number.EPSILON) * 100) / 100;
    return `${roundedKilometres} km`;
  };

  const formatSecondsToMinutes = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secondsMinusMinutes = seconds - minutes * 60;
    // Add hour marks if over an hour
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const minutesMinusHours = minutes - hours * 60;
      return `${hours}h ${minutesMinusHours}m ${secondsMinusMinutes}s`;
    }
    return `${minutes}m ${secondsMinusMinutes}s`;
  };

  // TODO turn these into loading/error components
  if (isLoading) {
    return <Loading />;
  }

  if (hasError) {
    return <Error />;
  }

  return (
    <Grid>
      <h3>Strava to Google Sheets</h3>
      <p>Every time you upload a run to Strava it will also write to a specified Google Sheet</p>
      <div>
        <div>
          <h2> Your strava id is:</h2>
          <p>{stravaUserId}</p>
          <h2> Your run count in the last month is:</h2>
          <p>{userRunCount || 'No count'}</p>
          <h2> Your Activities:</h2>
          <div>
            {userActivities
              ? userActivities.map((activity) => (
                <>
                  <DataPoint>{activity.name}</DataPoint>
                  <DataPoint>{activity.start_date}</DataPoint>
                  <DataPoint>{formatMetresToKilometres(activity.distance)}</DataPoint>
                  <DataPoint>{formatSecondsToMinutes(activity.moving_time)}</DataPoint>
                </>
              ))
              : 'No acitivites'}
          </div>
        </div>
        <a href="https://www.strava.com/oauth/authorize?client_id=44378&redirect_uri=http://localhost:3003&response_type=code&scope=activity:read_all">
          Authorize!
        </a>
      </div>
      <h3>Strava Data Viz</h3>
      <p>Visualizes all of your runs onto a map (or something!)</p>
      <h3>Strava Explorer</h3>
      <p>Enter an address and find some local runs!</p>
      <Link href="/about">About Page</Link>
    </Grid>
  );
};

export default StravaWrapper;

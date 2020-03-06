import React, { useState, useEffect } from 'react';

// const strava = require('strava-v3');

const StravaApi = () => {
  const [accessToken, setAccessToken] = useState(null);

  // useEffect(() => {
  //   strava.config({
  //     access_token: 'Your apps access token (Required for Quickstart)',
  //     client_id: '44378',
  //     client_secret: '68d0196721ef3be5a5907b8436ed965bd35e2a36',
  //     redirect_uri: 'localhost'
  //   });
  //   strava.athletes.get({ id: 44378 }, (err, payload, limits) => {
  //     console.log(err, payload, limits);
  //   });
  // }, [accessToken]);

  return (
    <div>
      <button
        type="button"
        onClick={() => setAccessToken('Success!')}
      >
        Get your Strava Account!
      </button>
      <div>
        Your access token is
        {` ${accessToken}`}
      </div>
    </div>
  );
};

export default StravaApi;

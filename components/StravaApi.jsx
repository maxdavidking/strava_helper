import React, { useState, useEffect } from 'react';

const StravaApi = () => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const StravaApiV3 = require('strava_api_v3');
    const defaultClient = StravaApiV3.ApiClient.instance;

    // Configure OAuth2 access token for authorization: strava_oauth
    const stravaOauth = defaultClient.authentications.strava_oauth;
    stravaOauth.accessToken = 'fa33c2994b219dee014e5a01ab7c2efa930e07f9';

    const api = new StravaApiV3.AthletesApi();

    const callback = (error, data, response) => {
      if (error) {
        console.error(error);
      } else {
        console.log(`API Called Successfully. Returned Data: ${data}`);
      }
    };
    api.getLoggedInAthlete(callback);
  }, [accessToken]);

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

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StravaApi = () => {
  const [stravaData, setStravaData] = useState('Empty');
  useEffect(() => {
    axios
      .get('https://www.strava.com/api/v3/athletes/663067/activities', {
        params: {
          access_token: 'fa33c2994b219dee014e5a01ab7c2efa930e07f9',
          per_page: '200'
        }
      })
      .then((response) => {
        const activities = response.data;
        setStravaData({ activities });
      });
  }, []);

  return (
    <div>
      <div>
        Your strava data is
        {` ${stravaData}`}
      </div>
    </div>
  );
};

export default StravaApi;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StravaApi = () => {
  const [stravaId, setStravaId] = useState('Empty');
  useEffect(() => {
    const token = 'fa33c2994b219dee014e5a01ab7c2efa930e07f9';
    const url = 'https://www.strava.com/api/v3/athlete';
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        const id = response.data.id;
        console.log(response);
        setStravaId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div>
        Your strava id is
        {` ${stravaId}`}
      </div>
    </div>
  );
};

export default StravaApi;

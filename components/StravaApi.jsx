import React, { useState, useEffect } from 'react';

const StravaApi = () => {
  const [apiResponse, setApiResponse] = useState('Pending');

  useEffect(() => {
    console.log('strava!');
  }, []);

  return (
    <div>
      <button
        type="button"
        onClick={() => setApiResponse('Success!')}
      >
        Get your Strava Account!
      </button>
      <div>
        Your url is
        {` ${apiResponse}`}
      </div>
    </div>
  );
};

export default StravaApi;

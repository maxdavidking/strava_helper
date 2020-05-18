import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DataPoint = styled.div`
  margin: 0.5em;
`;

const StravaDataDashboard = ({ userRunCount, userActivities, stravaUserId }) => {
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

  return (
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
  );
};

StravaDataDashboard.propTypes = {
  userActivities: PropTypes.array.isRequired,
  userRunCount: PropTypes.number.isRequired,
  stravaUserId: PropTypes.number.isRequired
};

export default StravaDataDashboard;

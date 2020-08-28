import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;
`;

const StravaId = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border: 1px solid #eaeaee;
`;

const RunCount = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border: 1px solid #eaeaee;
`;

const Data = styled.div`
  display: flex;
  padding: 2rem;
  flex-wrap: wrap;
`;

const DataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #eaeaee;
  margin: 1rem;
`;

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
    <Wrapper>
      <UserInfo>
        <StravaId>
          <h2> Your strava id is:</h2>
          <p>{stravaUserId}</p>
        </StravaId>
        <RunCount>
          <h2> Your run count in the last month is:</h2>
          <p>{userRunCount || 'No count'}</p>
        </RunCount>
      </UserInfo>
      <Data>
        {userActivities
          ? userActivities.map((activity) => (
            <DataWrapper>
              <DataPoint>{activity.name}</DataPoint>
              <DataPoint>{activity.start_date}</DataPoint>
              <DataPoint>{formatMetresToKilometres(activity.distance)}</DataPoint>
              <DataPoint>{formatSecondsToMinutes(activity.moving_time)}</DataPoint>
            </DataWrapper>
          ))
          : 'No acitivites'}
      </Data>
    </Wrapper>
  );
};

StravaDataDashboard.propTypes = {
  userActivities: PropTypes.array.isRequired,
  userRunCount: PropTypes.number.isRequired,
  stravaUserId: PropTypes.number.isRequired
};

export default StravaDataDashboard;

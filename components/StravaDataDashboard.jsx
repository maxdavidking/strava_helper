import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import Loading from './Loading';

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

  @media (max-width: 650px) {
    flex-direction: column;
  }
`;

const StravaId = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 25vw;
  padding: 2rem;
`;

const RunCount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 25vw;
  padding: 2rem;
`;

const Data = styled.div`
  display: flex;
  padding: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const DataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1.5rem;
  padding: 1rem;
  min-width: 150px;
  border-radius: 6px;
  box-shadow: 0 20px 25px 0 rgba(0, 0, 0, 0.1);
`;

const DataPoint = styled.p`
  margin: 0.5rem;
`;

const StravaDataDashboard = ({ userRunCount, userActivities, stravaUserId }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userActivities) {
      setIsLoading(false);
    }
  }, [userActivities]);

  const formatTimeStampToDate = (timestamp) => {
    const formattedDate = moment(timestamp).format('MM/DD/YYYY');
    return `${formattedDate}`;
  };
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

  if (isLoading) {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <UserInfo>
        <StravaId>
          <h2>Strava ID</h2>
          <p>{stravaUserId}</p>
        </StravaId>
        <RunCount>
          <h2>Activities in the past 30 days</h2>
          <p>{userRunCount || 'No count'}</p>
        </RunCount>
      </UserInfo>
      <Data>
        {userActivities
          ? userActivities.map((activity) => (
            <DataWrapper>
              <DataPoint>{activity.name}</DataPoint>
              <DataPoint>{formatTimeStampToDate(activity.start_date)}</DataPoint>
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

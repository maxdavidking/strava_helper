import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StravaRunExplorer = ({}) => (
  <>
    <h3>Strava Explorer</h3>
    <p>Enter an address and find some local runs!</p>
  </>
);

export default StravaRunExplorer;

StravaRunExplorer.propTypes = {
  userActivities: PropTypes.array.isRequired,
  userRunCount: PropTypes.number.isRequired,
  stravaUserId: PropTypes.number.isRequired
};

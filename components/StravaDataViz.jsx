import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StravaDataViz = ({}) => (
  <>
    <h3>Strava Data Viz</h3>
    <p>Visualizes all of your runs onto a map (or something!)</p>
  </>
);

export default StravaDataViz;

StravaDataViz.propTypes = {
  userActivities: PropTypes.array.isRequired,
  userRunCount: PropTypes.number.isRequired,
  stravaUserId: PropTypes.number.isRequired
};

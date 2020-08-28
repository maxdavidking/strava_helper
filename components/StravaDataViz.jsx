import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem;
  border: 1px solid #eaeaee;
`;

const Header = styled.h3``;

const Body = styled.p``;

const StravaDataViz = ({}) => (
  <Wrapper>
    <Header>Strava Data Viz</Header>
    <Body>Visualizes all of your runs onto a map (or something!)</Body>
  </Wrapper>
);

export default StravaDataViz;

StravaDataViz.propTypes = {
  userActivities: PropTypes.array.isRequired,
  userRunCount: PropTypes.number.isRequired,
  stravaUserId: PropTypes.number.isRequired
};

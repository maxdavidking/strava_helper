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

const StravaRunExplorer = () => (
  <Wrapper>
    <Header>Strava Explorer</Header>
    <Body>Enter an address and find some local runs!</Body>
  </Wrapper>
);

export default StravaRunExplorer;

StravaRunExplorer.propTypes = {
  userActivities: PropTypes.array.isRequired,
  userRunCount: PropTypes.number.isRequired,
  stravaUserId: PropTypes.number.isRequired
};

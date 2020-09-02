import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem;
  cursor: not-allowed;
  background: linear-gradient(to right, rgba(255, 255, 255, 0), #fff);
`;

const Body = styled.p`
  text-align: center;
`;

const StravaRunExplorer = () => (
  <Wrapper>
    <h2>Strava Explorer</h2>
    <Body>Find routes around your location</Body>
  </Wrapper>
);

export default StravaRunExplorer;

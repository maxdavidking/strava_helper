import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AuthorizeStravaPrompt = () => (
  // TODO figure out how to handle the flow of this redirect uri
  <Wrapper>
    <a href="https://www.strava.com/oauth/authorize?client_id=44378&redirect_uri=http://localhost:3003&response_type=code&scope=activity:read_all">
      <button type="button">Fetch Your Workouts</button>
    </a>
  </Wrapper>
);

export default AuthorizeStravaPrompt;

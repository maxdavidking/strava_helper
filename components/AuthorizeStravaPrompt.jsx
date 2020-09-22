import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h1`
  margin: 5rem 2rem;
`;

const AuthorizeStravaPrompt = () => (
  // TODO figure out how to remove the params from redirect URI once successful
  <Wrapper>
    <Header>Strava Helper</Header>
    <a
      href={`https://www.strava.com/oauth/authorize?client_id=44378&redirect_uri=${process.env.NEXT_PUBLIC_HOST}&response_type=code&scope=activity:read_all`}
    >
      <button type="button">Fetch Your Workouts</button>
    </a>
  </Wrapper>
);

export default AuthorizeStravaPrompt;

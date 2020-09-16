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
  // TODO figure out how to handle the flow of this redirect uri
  // Add redirect URL as env var
  <Wrapper>
    <Header>Strava Helper</Header>
    <a
      href={`https://www.strava.com/oauth/authorize?client_id=44378&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&response_type=code&scope=activity:read_all`}
    >
      <button type="button">Fetch Your Workouts</button>
    </a>
  </Wrapper>
);

export default AuthorizeStravaPrompt;

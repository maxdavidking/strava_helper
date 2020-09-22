import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 5rem 2rem;
`;

const Header = styled.div`
  font-size: 2rem;
`;

const Body = styled.div`
  font-size: 2rem;
  margin: 5rem;
`;

const Error = () => (
  <Wrapper>
    <Header>It looks like something went wrong with the API request</Header>
    <Body>
      <a href="mailto:maxdavidking@gmail.com">Shoot me an email to let me know</a>
    </Body>
  </Wrapper>
);

export default Error;

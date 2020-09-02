import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eaeaee;
  padding: 0 4rem;
  height: 10vh;
`;

const Header = styled.h3`
  a {
    color: black;
  }
`;

const NavBar = () => (
  <Wrapper>
    <Header>
      <a href="/">Strava Helper</a>
    </Header>
    <a href="mailto:maxdavidking@gmail.com">Contact</a>
  </Wrapper>
);

NavBar.propTypes = {};

export default NavBar;

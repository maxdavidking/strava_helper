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

const NavBar = () => (
  <Wrapper>
    <h3>Strava Helper</h3>
    <a href="mailto:maxdavidking@gmail.com">Contact</a>
  </Wrapper>
);

NavBar.propTypes = {};

export default NavBar;

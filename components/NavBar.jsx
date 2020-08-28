import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`;

const NavBar = () => (
  <Wrapper>
    <button type="button">This is the Navbar!</button>
  </Wrapper>
);

NavBar.propTypes = {};

export default NavBar;

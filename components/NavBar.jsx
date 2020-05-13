import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`;
const NavBar = () => <Wrapper> This is the Navbar! </Wrapper>;

NavBar.propTypes = {};

export default NavBar;

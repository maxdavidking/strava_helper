import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  display: flex;
  color: white;
  background-color: gray;
  padding: 1rem;
  justify-content: center;
  align-items: center;
`;

const Disclaimer = styled.p`
  a {
    color: white;
  }
`;

const Footer = () => (
  <FooterWrapper>
    <Disclaimer>
      <a href="https://github.com/maxdavidking/strava_helper">GitHub Repo</a>
    </Disclaimer>
  </FooterWrapper>
);

export default Footer;

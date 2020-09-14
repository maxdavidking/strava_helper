import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem;
  cursor: not-allowed;
`;

const Body = styled.p`
  text-align: center;
`;

const Ribbon = styled.div`
  width: 150px;
  height: 150px;
  overflow: hidden;
  position: absolute;
  left: inherit;
  opacity: 0.3;

  @media (max-width: 750px) {
    left: 10%;
  }

  @media (max-width: 450px) {
    left: 0;
  }

  &:before {
    position: absolute;
    z-index: -1;
    content: '';
    display: block;
    border: 5px solid #2980b9;
    border-top-color: transparent;
    border-left-color: transparent;
    top: 0;
    right: 0;
  }

  &:after {
    position: absolute;
    z-index: -1;
    content: '';
    display: block;
    border: 5px solid #2980b9;
    border-top-color: transparent;
    border-left-color: transparent;
    bottom: 0;
    left: 0;
  }

  span {
    position: absolute;
    display: block;
    width: 225px;
    padding: 15px 0;
    background-color: #3498db;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    color: #fff;
    font: 700 18px/1 'Lato', sans-serif;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    text-transform: uppercase;
    text-align: center;
    right: -25px;
    top: 30px;
    transform: rotate(-45deg);
  }
`;

const StravaRunExplorer = () => (
  <Wrapper>
    <Ribbon>
      <span>Coming Soon</span>
    </Ribbon>
    <h2>Strava Explorer</h2>
    <Body>Find routes around your location</Body>
  </Wrapper>
);

export default StravaRunExplorer;

import React from 'react';
import styled from 'styled-components';

// TODO update font and global fonts
const Spinner = styled.div`
  height: 25vh;
  position: relative;
  transition: opacity linear 0.1s;
  text-align: center;
  margin: 2em;
  font-size: 4vw;

  &::before {
    animation: 2s linear infinite spinner;
    border: solid 3px #eee;
    border-bottom-color: #ef6565;
    border-radius: 50%;
    content: '';
    height: 40px;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    transform-origin: center;
    width: 40px;
    will-change: transform;
  }

  @keyframes spinner {
    0% {
      transform: translate3d(-50%, -50%, 0) rotate(0deg);
    }
    100% {
      transform: translate3d(-50%, -50%, 0) rotate(360deg);
    }
  }
`;

const Loading = () => <Spinner>Loading...</Spinner>;

export default Loading;

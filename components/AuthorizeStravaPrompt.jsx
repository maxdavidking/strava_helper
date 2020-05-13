import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AuthorizeStravaPrompt = () => (
  <div>
    <a href="https://www.strava.com/oauth/authorize?client_id=44378&redirect_uri=http://localhost:3003&response_type=code&scope=activity:read_all">
      Authorize!
    </a>
  </div>
);

export default AuthorizeStravaPrompt;
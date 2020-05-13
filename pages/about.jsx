import styled from 'styled-components';
import StravaApi from '../components/StravaApi';

const About = () => {
  const Header = styled.h1`
    color: red;
  `;

  const Grid = styled.div`
    display: grid;
  `;

  return (
    <>
      <Header>About.jsx</Header>
      <Grid>
        <h3>Strava to Google Sheets</h3>
        <p>Every time you upload a run to Strava it will also write to a specified Google Sheet</p>
        <StravaApi />
        <h3>Strava Data Viz</h3>
        <p>Visualizes all of your runs onto a map (or something!)</p>
        <StravaApi />
        <h3>Strava Explorer</h3>
        <p>Enter an address and find some local runs!</p>
        <StravaApi />
      </Grid>
      <footer />
    </>
  );
};

export default About;

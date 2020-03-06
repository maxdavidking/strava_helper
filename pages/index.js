import Head from 'next/head';
import styled from 'styled-components';

const Home = () => {
  const Header = styled.h1`
    color: red;
  `
  const Grid = styled.div`
    display: grid;
  `

  const StyledLink = styled.a`
    color: black;
    text-decoration: none;

    :hover {
      color: purple;
    }
  `
  return (
    <>
      <Head>
        <title>Strava Helper</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Header>
          Welcome to Strava Helper
        </Header>

        <Grid>
          <h3>Strava to Google Sheets</h3>
          <StyledLink href="https://nextjs.org/docs">
            <p>Every time you upload a run to Strava it will also write to a specified Google Sheet</p>
          </StyledLink>

          <h3>Strava Data Viz</h3>
          <StyledLink href="https://nextjs.org/learn">
            <p>Visualizes all of your runs onto a map (or something!)</p>
          </StyledLink>

          <h3>Strava Explorer</h3>
          <StyledLink
            href="https://github.com/zeit/next.js/tree/master/examples"
          >
            <p>Enter an address and find some local runs!</p>
          </StyledLink>
        </Grid>
    <footer>
    </footer>
    </>
  )
};

export default Home;

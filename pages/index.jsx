import Head from 'next/head';
import { createGlobalStyle } from 'styled-components';
import { lighten, darken } from 'polished';
import { Normalize } from 'styled-normalize';
import StravaContainer from '../components/StravaContainer';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Roboto', sans-serif;
  }

  h1 {
    font-size: 4rem;
  }

  button {
    cursor: pointer;
    text-decoration: none;
    border-radius: 25px;
    background-color: #3dd16b;
    font-weight: 700;
    font-size: 18px;
    transition: all 0.1s ease;
    color: white;
    padding: 16px 29px;
    border: none;

    &:hover {
      background-color: ${lighten(0.1, '#3dd16b')}
    }
  }
`;
const Home = () => (
  <>
    <Head>
      <title>Strava Helper</title>
      <link rel="icon" href="/favicon.ico" />
      <script src="https://apis.google.com/js/api.js" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
        rel="stylesheet"
      />
    </Head>
    <Normalize />
    <GlobalStyle />
    <NavBar />
    <StravaContainer />
    <Footer />
  </>
);

export default Home;

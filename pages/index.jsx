import Head from 'next/head';
import { createGlobalStyle } from 'styled-components';
import { lighten, darken } from 'polished';
import { Normalize } from 'styled-normalize';
import Container from '../components/Container';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;

    @media (max-width: 960px) {
      font-size: 14px;
    }

    @media (max-width: 420px) {
      font-size: 12px;
    }
  }

  html {
    height: 100%;
  }

  body {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  footer {
    flex-shrink: 0;
  }

  h1 {
    font-size: 4rem;
    font-weight: 100;
    rgba(0,0,0,.7);
    letter-spacing: -1.1px;
  }

  h2 {
    font-size: 2rem;
    font-weight: 100;
    rgba(0,0,0,.7);
    letter-spacing: -1.1px;
    text-align: center;
  }

  h3 {
    font-size: 1.25rem;
  }

  button {
    cursor: pointer;
    text-decoration: none;
    border-radius: 25px;
    background-color: #3dd16b;
    font-weight: 700;
    transition: all 0.1s ease;
    color: white;
    padding: 16px 29px;
    border: none;
    font-size: 1rem;

    &:hover {
      background-color: ${lighten(0.1, '#3dd16b')}
    }
  }

  a {
    cursor: pointer;
    text-decoration: none;
    font-weight: 700;
    font-size: 18px;
    transition: all 0.1s ease;
    color: #3dd16b;

    &:hover {
      color: ${lighten(0.1, '#3dd16b')}
    }
  }

  p {
    font-size: 1rem;
    color: rgba(0,0,0,.7);
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
    <Container />
    <Footer />
  </>
);

export default Home;

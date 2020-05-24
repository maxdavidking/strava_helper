import Head from 'next/head';
import StravaContainer from '../components/StravaContainer';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Home = () => (
  <>
    <Head>
      <title>Strava Helper</title>
      <link rel="icon" href="/favicon.ico" />
      <script src="https://apis.google.com/js/api.js" />
    </Head>
    <NavBar />
    <StravaContainer />
    <Footer />
  </>
);

export default Home;

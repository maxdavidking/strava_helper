import Head from 'next/head';
import StravaWrapper from '../components/StravaWrapper';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Home = () => (
  <>
    <Head>
      <title>Strava Helper</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <NavBar />
    <StravaWrapper />
    <Footer />
  </>
);

export default Home;

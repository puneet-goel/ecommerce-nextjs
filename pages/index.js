import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import HomeComponent from '../components/Home';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Discussion Forum</title>
        <meta
          name='description'
          content='Application that provides discussion platform to users'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <HomeComponent />
    </div>
  );
}


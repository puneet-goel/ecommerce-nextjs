import '../styles/globals.scss';
import Head from 'next/head';
import { Provider } from 'react-redux';
import store from '../store/index';

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Head>
				<title>Discussion Forum</title>
				<meta
					name='description'
					content='Application that provides discussion platform to users'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;


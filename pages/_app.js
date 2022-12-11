import '../styles/globals.scss';
import Navbar from '../components/Navbar/Navbar';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Navbar />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;


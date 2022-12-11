import '../styles/globals.scss';
import Navbar from '../components/Navbar/Navbar';
import { Provider } from 'react-redux';
import store from '../store/index';

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Navbar />
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;


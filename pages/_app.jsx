import { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import { onIdTokenChanged } from 'firebase/auth';
import Head from 'next/head';
import Navbar from 'components/Navbar/Navbar';
import AuthNavbar from 'components/Navbar/AuthNavbar';
import Footer from 'components/Footer/Footer';
import store from 'store/index';
import { firebaseAuth } from 'connections/firebaseClient.js';
import { setCookie, deleteCookie } from 'utility/client.js';
import 'styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';

const authRoutes = ['/login', '/signup', '/reset-password'];
const routesWithGoodSEO = [
	'/',
	'/search',
	'/search/[productId]',
	'/cart',
	'/about',
	'/coupons',
	'/login',
	'/signup',
	'/reset-password',
];

function MyApp({ Component, pageProps }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const router = useRouter();
	const isAuthRoute = authRoutes.includes(router.route);
	const routesAccessedWithoutLogin = routesWithGoodSEO.includes(router.route);

	useEffect(() => {
		let unsubscribe;
		unsubscribe = onIdTokenChanged(firebaseAuth, async (user) => {
			try {
				if (user) {
					setUser({
						uid: user.uid,
						email: user.email,
					});
					const token = await user.getIdToken();
					setCookie('token', token, 60 * 60 * 1000);
					localStorage.setItem('uid', user.uid);
					localStorage.setItem('email', user.email);
				} else {
					setUser(null);
					deleteCookie('token');
					localStorage.removeItem('uid');
					localStorage.removeItem('email');
				}
			} catch (err) {
				console.error(err);
			}
			setLoading(false);
		});
		return () => unsubscribe();
	}, []);

	// force refresh the token every 10 minutes
	useEffect(() => {
		const handle = setInterval(async () => {
			try {
				const user = firebaseAuth.currentUser;
				if (user) await user.getIdToken(true);
			} catch (err) {
				console.error(err);
			}
		}, 60 * 60 * 1000);

		// clean up setInterval
		return () => clearInterval(handle);
	}, []);

	return (
		<>
			<Head>
				<title>Online Shopping Site</title>
				<meta
					name='description'
					content='This application provides consumers a platform to shop online and retailers a way to sell their products directly to customers.'
				/>
				<link rel='icon' href='/carts.png' />
			</Head>
			{isAuthRoute && (
				<>
					<AuthNavbar />
					<Component {...pageProps} />
				</>
			)}

			{!isAuthRoute && (
				<Provider store={store}>
					<div id='start' className='start_of_page' />
					<Navbar />
					{!routesAccessedWithoutLogin ? (
						<ProtectedRoute user={user} loading={loading}>
							<Component {...pageProps} />
						</ProtectedRoute>
					) : (
						<Component {...pageProps} />
					)}
					<Footer email={user ? user.email : null} />
				</Provider>
			)}
		</>
	);
}

export default MyApp;


import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar/Navbar';
import AuthNavbar from '../components/AuthNavbar/AuthNavbar';
import { AuthContextProvider } from '../context/AuthContext.jsx';
import { Provider } from 'react-redux';
import store from '../store/index';
import '../styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';

const authRoutes = ['/login', '/signup', '/reset-password'];

function MyApp({ Component, pageProps }) {
	const [searchText, setSearchText] = useState('');
	const router = useRouter();

	const isAuthRoute = authRoutes.includes(router.route);

	return (
		<>
			<Head>
				<title>Discussion Forum</title>
				<meta
					name='description'
					content='Application that provides discussion platform to users'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<AuthContextProvider>
				<Provider store={store}>
					{isAuthRoute ? (
						<>
							<AuthNavbar />
							<Component {...pageProps} />
						</>
					) : (
						<ProtectedRoute>
							<Navbar searchText={searchText} setSearchText={setSearchText} />
							<Component {...pageProps} searchText={searchText} />
						</ProtectedRoute>
					)}
				</Provider>
			</AuthContextProvider>
		</>
	);
}

export default MyApp;


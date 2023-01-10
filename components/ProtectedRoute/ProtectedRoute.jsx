import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { fetchProducts } from 'store/productSlice.js';

const ProtectedRoute = ({ children, user, loading }) => {
	const router = useRouter();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	useEffect(() => {
		if (!user && !loading) {
			router.replace('/signup');
		}
	}, [router, user, loading]);

	return <>{user ? children : null}</>;
};

export default ProtectedRoute;

import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useRouter } from 'next/router';

const ProtectedRoute = ({ children }) => {
	const { user } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!user) {
			router.push('/signup');
		}
	}, [router, user]);

	return <>{user ? children : null}</>;
};

export default ProtectedRoute;

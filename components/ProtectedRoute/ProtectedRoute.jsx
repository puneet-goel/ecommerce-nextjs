import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllDiscussions } from '../../store/discussionSlice';

const ProtectedRoute = ({ children }) => {
	const { user } = useAuth();
	const router = useRouter();
	const dispatch = useDispatch();
	const summaryData = useSelector((state) => state.discussions.discussions);

	useEffect(() => {
		if (!user) {
			router.push('/signup');
		} else {
			if (summaryData?.length === 0) dispatch(fetchAllDiscussions());
		}
	}, [router, user, dispatch, summaryData]);

	return <>{user ? children : null}</>;
};

export default ProtectedRoute;

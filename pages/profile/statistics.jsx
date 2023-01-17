import { useRouter } from 'next/router';

const ProfileStatistics = () => {
	const router = useRouter();
	console.log('views', 'no of posts');
	return <div>{router.query}</div>;
};

export default ProfileStatistics;

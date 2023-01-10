import { useRouter } from 'next/router';

const ProfileStatistics = () => {
	const router = useRouter();

	return <div>{router.query}</div>;
};

export default ProfileStatistics;

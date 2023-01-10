import { useRouter } from 'next/router';

const Profile = () => {
	const router = useRouter();

	return <div>{router.query}</div>;
};

export default Profile;

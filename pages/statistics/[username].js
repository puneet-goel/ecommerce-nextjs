import { useRouter } from 'next/router';

export default function ProfileStats() {
	const router = useRouter();

	return <div>{router.query.username}</div>;
}

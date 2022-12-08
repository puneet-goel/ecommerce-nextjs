import { useRouter } from 'next/router';

export default function Profile() {
  const router = useRouter();

  return <div>{router.query.username}</div>;
}

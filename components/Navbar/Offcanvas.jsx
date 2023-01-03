import styles from '../../styles/offcanvas.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext.jsx';

const Offcanvas = ({ offCanvas, handleOffCanvas, username }) => {
	const { logout } = useAuth();

	const handleLogout = (event) => {
		event.preventDefault();
		logout();
	};

	return (
		<div
			className={`
				${styles.offcanvas}
				${offCanvas ? styles.offcanvas__open : ''}
			`}
			onClick={handleOffCanvas}
		>
			<div
				className={`
				${styles.offcanvas__drawer}
				${offCanvas ? styles.offcanvas__drawer__open : ''}
			`}
				onClick={(e) => e.stopPropagation()}
			>
				<button className={styles.close} onClick={handleOffCanvas}>
					<CloseIcon />
				</button>
				<ul onClick={handleOffCanvas}>
					<li>
						<Link href='/'>
							<button className='button'>Home</button>
						</Link>
					</li>
					<li>
						<Link href={`/statistics/${username}/`}>
							<button className='button'>Account Statistics</button>
						</Link>
					</li>
					<li>
						<Link href='/create-topic/'>
							<button className='button'>Create New Topic</button>
						</Link>
					</li>
					<li>
						<Link href='/users'>
							<button className='button'>Users</button>
						</Link>
					</li>
					<li>
						<Link href='/tags/'>
							<button className='button'>Tags</button>
						</Link>
					</li>
					<li>
						<Link href={`/profile/${username}/`}>
							<button className='button'>Profile</button>
						</Link>
					</li>

					<li>
						<a
							href='https://v-meet-puneet.netlify.app/'
							target='_blank'
							rel='noreferrer'
						>
							<button className='button'>Video Chat</button>
						</a>
					</li>
					<li>
						<button className='button' onClick={handleLogout}>
							Logout
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Offcanvas;

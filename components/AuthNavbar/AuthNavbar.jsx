import Link from 'next/link';
import styles from '../../styles/auth_navbar.module.scss';

const AuthNavbar = () => {
	return (
		<>
			<div className='elevation navbar'>
				<div className={styles.auth_navbar}>
					<h1>Discussion</h1>
					<div>
						<Link href='/login'>
							<button className='button button_outlined'>Log in</button>
						</Link>
						<Link href='/signup'>
							<button className='button'>Sign up</button>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default AuthNavbar;

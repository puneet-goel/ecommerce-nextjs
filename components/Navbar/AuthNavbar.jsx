import Link from 'next/link';
import Tooltip from '@mui/material/Tooltip';
import cartLogo from 'public/shopping-cart.png';
import Image from 'next/image';
import styles from 'styles/auth_navbar.module.scss';

const AuthNavbar = () => {
	return (
		<div className={`${styles.auth_navbar} elevation navbar`}>
			<Tooltip title='Emart Home Page' placement='bottom'>
				<Link href='/'>
					<Image src={cartLogo} alt='Emart home logo' width='40' height='40' />
					<h1>Emart</h1>
				</Link>
			</Tooltip>
			<div>
				<Link href='/login'>
					<button className='button button_outlined'>Log in</button>
				</Link>
				<Link href='/signup'>
					<button className='button'>Sign up</button>
				</Link>
			</div>
		</div>
	);
};

export default AuthNavbar;

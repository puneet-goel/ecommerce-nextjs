import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Link from 'next/link';
import Fab from '@mui/material/Fab';
import styles from 'styles/footer.module.scss';
import { logout } from 'firebase-auth/firebase-client.js';

const Footer = ({ email }) => {
	console.log(email);

	const handleLogout = (event) => {
		event.preventDefault();
		if (email) logout();
	};

	return (
		<>
			<div className={styles.footer}>
				<div className={styles.footer_home}>
					<Link href='/'>Go to Home Page</Link>
				</div>
				<div className={styles.footer_content}>
					<div className={styles.footer_column}>
						<h3> Features </h3>
						<ul>
							<li>
								<Link href='/search'>Search Products</Link>
							</li>
							<li>
								<Link href='/order-history'>Your Orders</Link>
							</li>
							<li>
								<Link href='/coupons'>Coupons</Link>
							</li>
							<li>
								<Link href='/cart'>Shop</Link>
							</li>
						</ul>
					</div>
					<div className={styles.footer_column}>
						<h3> Retailer </h3>
						<ul>
							<li>
								<Link href='/add-product'>Add new Product</Link>
							</li>
							<li>
								<Link href='/update-product'>Update Products</Link>
							</li>
							<li>
								<Link href='/profile/statistics'>Account Statistics</Link>
							</li>
						</ul>
					</div>
					<div className={styles.footer_column}>
						<h3> Get to Know Us </h3>
						<ul>
							<li>
								<Link href='/about'>About us</Link>
							</li>
						</ul>
					</div>
					<div className={styles.footer_column}>
						<h3> Account </h3>
						<ul>
							<li>
								<Link href='/profile'>Profile</Link>
							</li>
							<li>
								<Link href='/profile'>Update Profile</Link>
							</li>
						</ul>
					</div>
					<div className={styles.footer_column}>
						<h3> User Authentication </h3>
						<ul>
							<li>
								<Link href='/login'>Login</Link>
							</li>
							<li>
								<Link href='/signup'>Signup</Link>
							</li>
							<li>
								<Link href='/reset-password'>Reset Password</Link>
							</li>
							<li onClick={handleLogout} className={styles.footer_cursor}>
								Logout
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className={styles.controls}>
				<Link href='#start'>
					<Fab size='small' aria-label='scroll back to top'>
						<KeyboardArrowUpIcon />
					</Fab>
				</Link>
				<Link href='#end'>
					<Fab size='small' aria-label='scroll to bottom'>
						<KeyboardArrowDownIcon />
					</Fab>
				</Link>
			</div>
			<div id='end' />
		</>
	);
};

export default Footer;

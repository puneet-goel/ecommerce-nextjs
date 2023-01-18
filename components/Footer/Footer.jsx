import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Link from 'next/link';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import Fab from '@mui/material/Fab';
import styles from 'styles/footer.module.scss';
import { logout } from 'firebase-auth/firebase-client.js';

const Footer = ({ email }) => {
	const handleLogout = (event) => {
		event.preventDefault();
		if (email) logout();
	};

	return (
		<>
			<div className={styles.footer}>
				<Link href='/'>
					<div className={styles.footer_home}>Go to Home Page</div>
				</Link>
				<div className={styles.footer_content}>
					<div className={styles.footer_column}>
						<h3> Features </h3>
						<ul>
							<li>
								<Link href='/search'>Search Products</Link>
							</li>
							<li>
								<Link href='/order-history'>Past Orders</Link>
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
								<Link href='/about'>About Us</Link>
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
				<div className={styles.contact_us}>
					<h1>Emart</h1>
					<div className={styles.contact_wrapper}>
						<p>Contact Us</p>
						<div className={styles.contact_icons}>
							<Link href='https://github.com/puneet-goel' legacyBehavior>
								<a target='_blank' rel='noopener noreferrer'>
									<GitHubIcon />
								</a>
							</Link>
							<Link
								href='https://www.linkedin.com/in/gl-puneet/'
								legacyBehavior
							>
								<a target='_blank' rel='noopener noreferrer'>
									<LinkedInIcon />
								</a>
							</Link>
							<Link href='mailto:puneetgoel016@gmail.com'>
								<EmailIcon />
							</Link>
						</div>
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

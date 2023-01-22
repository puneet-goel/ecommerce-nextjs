import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';
import { logout } from 'firebase-auth/firebase-client.js';
import styles from 'styles/offcanvas.module.scss';

const Offcanvas = ({ offCanvas, handleOffCanvas, email }) => {
	const handleLogout = (event) => {
		event.preventDefault();
		if (email) logout();
	};

	return (
		<div
			className={`
				${styles.offcanvas}
				${offCanvas ? styles.offcanvas__open : ''}
			`}
			onClick={handleOffCanvas}
		>
			<button className={styles.close} onClick={handleOffCanvas}>
				<CloseIcon fontSize='large' />
			</button>
			<div
				className={`
				${styles.offcanvas__drawer}
				${offCanvas ? styles.offcanvas__drawer__open : ''}
			`}
				onClick={(e) => e.stopPropagation()}
			>
				<h2 className={styles.offcanvas_heading}>
					{email ? (
						`Hello, ${email.split('@')[0]}`
					) : (
						<Link href='/signup'>Signup</Link>
					)}
				</h2>

				<hr />
				<ul onClick={handleOffCanvas}>
					<li>
						<Link href='/'>Home</Link>
					</li>
					<li>
						<Link href='/search'>
							Search Trending Products from Best Sellers
						</Link>
					</li>
					<li>
						<Link href='/coupons'> Coupons </Link>
					</li>
					<li>
						<Link href='/cart'>Cart</Link>
					</li>
					<li>
						<Link href='/order-history'>Your Orders</Link>
					</li>
				</ul>

				<hr />
				<h3>Retailer</h3>
				<ul onClick={handleOffCanvas}>
					<li>
						<Link href='/profile/statistics'>Account Statistics</Link>
					</li>
					<li>
						<Link href='/add-product'>Add New Product</Link>
					</li>
					<li>
						<Link href='/update-product'>Update Your Product</Link>
					</li>
				</ul>

				<hr />
				<h3>Informaton</h3>
				<ul onClick={handleOffCanvas}>
					<li>
						<Link href='/about'>Get to know about us</Link>
					</li>
				</ul>

				<hr />
				<h3>Account Settings</h3>
				<ul onClick={handleOffCanvas}>
					<li>
						<Link href='/profile'>Profile</Link>
					</li>
					<li>
						<Link href='/profile'>Update Profile</Link>
					</li>
					<li>
						<Link href='/reset-password'>Reset Password</Link>
					</li>
					{email ? (
						<li onClick={handleLogout}>
							<span>Logout</span>
						</li>
					) : (
						<li>
							<Link href='/signup'>Signup</Link>
						</li>
					)}
				</ul>
			</div>
		</div>
	);
};

export default Offcanvas;

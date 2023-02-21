import { useState, useEffect } from 'react';
import Offcanvas from './Offcanvas';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreIcon from '@mui/icons-material/MoreVert';
import Link from 'next/link';
import Tooltip from '@mui/material/Tooltip';
import { logout } from 'firebase-auth/firebase-client.js';
import { stringToColor, getUserEmail } from 'utility/client.js';
import cart from 'utility/cart.js';
import cartLogo from 'public/shopping-cart.png';
import Image from 'next/image';

const Navbar = () => {
	const [email, setEmail] = useState(null);
	const [loading, setLoading] = useState(true);
	const [cartItems, setCartItems] = useState(0);

	//either redux or pooling
	//preferring pooling over redux just for learning purpose
	useEffect(() => {
		const intervalId = setInterval(() => {
			setCartItems(cart.getCart().length);
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	useEffect(() => {
		const x = getUserEmail();
		if (x !== '') {
			setEmail(x);
		} else {
			setEmail(null);
		}
		setLoading(false);
	}, []);

	const [anchorEl, setAnchorEl] = useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const [offCanvas, setOffCanvas] = useState(false);

	const handleOffCanvas = () => {
		setOffCanvas(!offCanvas);
	};

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const handleLogout = (event) => {
		event.preventDefault();
		if (email) logout();
	};

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose}>
				<Link href='/profile' style={{ color: 'black' }}>
					Profile
				</Link>
			</MenuItem>
			{email ? (
				<MenuItem onClick={handleLogout}>Logout</MenuItem>
			) : (
				<MenuItem>
					<Link href='/signup' style={{ color: 'black' }}>
						Signup
					</Link>
				</MenuItem>
			)}
		</Menu>
	);

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<Link href='/search' style={{ color: 'black' }}>
					<IconButton
						size='large'
						aria-label='search trending products'
						color='inherit'
					>
						<SearchIcon />
					</IconButton>
					Search Products
				</Link>
			</MenuItem>
			<MenuItem>
				<Link href='/cart' style={{ color: 'black' }}>
					<IconButton
						size='large'
						aria-label='show products in cart'
						color='inherit'
					>
						<Badge badgeContent={cartItems ? cartItems : '0'} color='error'>
							<ShoppingCartIcon />
						</Badge>
					</IconButton>
					Cart
				</Link>
			</MenuItem>
			<MenuItem>
				<Link href='/order-history' style={{ color: 'black' }}>
					<IconButton
						size='large'
						aria-label='order history'
						aria-controls='primary-search-account-menu'
						aria-haspopup='true'
						color='inherit'
					>
						<ReceiptIcon />
					</IconButton>
					Past Orders
				</Link>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					size='large'
					aria-label='account of current user'
					aria-controls='primary-search-account-menu'
					aria-haspopup='true'
					color='inherit'
				>
					<AccountCircle />
				</IconButton>
				Profile
			</MenuItem>
		</Menu>
	);

	return (
		<Box>
			<AppBar position='fixed' style={{ backgroundColor: '#02284e' }}>
				<Toolbar>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='open drawer'
						sx={{ mr: 2 }}
						onClick={handleOffCanvas}
					>
						<MenuIcon />
					</IconButton>

					<Tooltip title='Emart Home Page' placement='bottom'>
						<Link
							href='/'
							style={{
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<Image
								src={cartLogo}
								alt='Emart home logo'
								width='40'
								height='40'
								style={{
									marginRight: '16px',
								}}
							/>
							<Typography
								variant='h6'
								noWrap
								component='div'
								sx={{ color: 'floralwhite' }}
							>
								Emart
							</Typography>
						</Link>
					</Tooltip>

					<Box sx={{ flexGrow: 1 }} />

					<Box
						sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}
					>
						<Tooltip title='Search Trending Products' placement='bottom'>
							<Link href='/search' style={{ color: 'white' }}>
								<IconButton
									size='large'
									aria-label='search trending products'
									color='inherit'
								>
									<SearchIcon />
									<p style={{ fontSize: 'medium', marginLeft: '8px' }}>
										Search
									</p>
								</IconButton>
							</Link>
						</Tooltip>
						<Tooltip title='Cart' placement='bottom'>
							<Link href='/cart' style={{ color: 'white' }}>
								<IconButton
									size='large'
									aria-label='show products in cart'
									color='inherit'
								>
									<Badge
										badgeContent={cartItems ? cartItems : '0'}
										color='error'
									>
										<ShoppingCartIcon />
									</Badge>
								</IconButton>
							</Link>
						</Tooltip>
						<Tooltip title='Your orders' placement='bottom'>
							<Link
								href='/order-history'
								style={{
									color: 'white',
									display: 'flex',
									alignItems: 'center',
									padding: '1em',
								}}
							>
								<p>Past Orders</p>
							</Link>
						</Tooltip>
						<IconButton
							size='large'
							edge='end'
							aria-label='account of current user'
							aria-controls={menuId}
							aria-haspopup='true'
							onClick={handleProfileMenuOpen}
							color='inherit'
						>
							{email ? (
								<div
									className='avatar'
									style={{
										backgroundColor: stringToColor(email),
										margin: 'auto',
									}}
								>
									<p className='avatar_text'>{email.split('@')[0][0]}</p>
								</div>
							) : (
								<AccountCircle />
							)}
						</IconButton>
					</Box>

					<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-label='show more'
							aria-controls={mobileMenuId}
							aria-haspopup='true'
							onClick={handleMobileMenuOpen}
							color='inherit'
						>
							<MoreIcon />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			{!email && !loading && (
				<div
					className='elevation'
					style={{
						position: 'absolute',
						top: '70px',
						backgroundColor: 'white',
						color: 'black',
						padding: '20px',
						right: '1em',
						border: '1px solid #0c2e72',
						textAlign: 'center',
						zIndex: 1099,
					}}
				>
					<Link href='/signup'>Signup</Link>
					<br />
					Already have an account? <Link href='/login'>Login</Link>
				</div>
			)}
			{renderMobileMenu}
			{renderMenu}
			<Offcanvas
				offCanvas={offCanvas}
				handleOffCanvas={handleOffCanvas}
				email={email}
			/>
		</Box>
	);
};

export default Navbar;

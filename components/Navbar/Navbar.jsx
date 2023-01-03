import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Offcanvas from './Offcanvas';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ForumIcon from '@mui/icons-material/Forum';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Link from 'next/link';
import Tooltip from '@mui/material/Tooltip';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/userSlice';

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '40ch',
			},
		},
	},
}));

const Navbar = ({ searchText, setSearchText, disableSearch }) => {
	const dispatch = useDispatch();

	const username = useSelector((state) => state?.users?.username);
	const totalDiscussions = useSelector((state) => {
		const total =
			0 ||
			state?.discussions?.discussions?.reduce(
				(prev, cur) => prev + cur.createdBy === username,
				0
			);
		return total;
	});

	const [updates, setUpdates] = useState('0');

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

	const handleLogout = () => {
		dispatch(logout());
		handleMenuClose();
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
			<Link href={`/profile/${username}`} style={{ color: 'black' }}>
				<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
			</Link>

			<MenuItem onClick={handleLogout}>Logout</MenuItem>
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
				<IconButton
					size='large'
					aria-label='show user discussions'
					color='inherit'
				>
					<Badge badgeContent={totalDiscussions} color='error'>
						<ForumIcon />
					</Badge>
				</IconButton>
				<p>Discussions</p>
			</MenuItem>
			<MenuItem>
				<IconButton
					size='large'
					aria-label='show notifications'
					color='inherit'
				>
					<Badge badgeContent={updates} color='error'>
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<p>Notifications</p>
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
				<p>Profile</p>
			</MenuItem>
		</Menu>
	);

	return (
		<Box>
			<AppBar position='fixed'>
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
					<Tooltip title='Home' placement='bottom'>
						<Link href='/'>
							<HomeIcon
								sx={{
									display: { xs: 'none', sm: 'block' },
									marginRight: '4px',
									cursor: 'pointer',
									color: 'floralwhite',
								}}
							/>
						</Link>
					</Tooltip>
					<Link href='/'>
						<Typography
							variant='h6'
							noWrap
							component='div'
							sx={{
								display: { xs: 'none', sm: 'block' },
								color: 'floralwhite',
							}}
						>
							Discussion
						</Typography>
					</Link>
					{!disableSearch && (
						<Search>
							<SearchIconWrapper>
								<SearchIcon />
							</SearchIconWrapper>
							<StyledInputBase
								value={searchText}
								onChange={(e) => setSearchText(e.target.value)}
								placeholder='Search…'
								inputProps={{ 'aria-label': 'search' }}
							/>
						</Search>
					)}
					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
						<Tooltip title='Your Discussions' placement='bottom'>
							<IconButton
								size='large'
								aria-label='show user discussions'
								color='inherit'
							>
								<Badge badgeContent={totalDiscussions} color='error'>
									<ForumIcon />
								</Badge>
							</IconButton>
						</Tooltip>
						<Tooltip title='Notifications' placement='bottom'>
							<IconButton
								size='large'
								aria-label='show notifications'
								color='inherit'
							>
								<Badge badgeContent={updates} color='error'>
									<NotificationsIcon />
								</Badge>
							</IconButton>
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
							<AccountCircle />
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
			{renderMobileMenu}
			{renderMenu}
			<Offcanvas
				offCanvas={offCanvas}
				handleOffCanvas={handleOffCanvas}
				username={username}
			/>
		</Box>
	);
};

export default Navbar;

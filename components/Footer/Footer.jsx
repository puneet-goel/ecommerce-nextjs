import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Link from 'next/link';
import Fab from '@mui/material/Fab';
import styles from 'styles/footer.module.scss';

const Footer = () => {
	return (
		<div className={styles.footer}>
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
			This is footer
		</div>
	);
};

export default Footer;

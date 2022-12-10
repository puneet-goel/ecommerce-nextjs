import React, { useEffect, useState } from 'react';
import styles from '../../styles/home.module.scss';
import Link from 'next/link';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Card from './Card';
import Fab from '@mui/material/Fab';
import Filter from './Filter';
import Navbar from './Navbar';
import { x } from './rawdata';

const HomeComponent = () => {
	const [summaries, setSummaries] = useState(x);
	useEffect(() => {}, []);

	return (
		<div className={styles.home}>
			<Navbar />

			<div className={styles.content}>
				<div className={styles.left}>
					<Filter />
				</div>
				<div className={styles.right}>
					<div id='start' />
					{summaries?.length &&
						summaries.map((summary, idx) => {
							return <Card key={idx} summary={summary} />;
						})}
					<div id='end' />
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
		</div>
	);
};

export default HomeComponent;

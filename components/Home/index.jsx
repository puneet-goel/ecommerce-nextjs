import { useState, useMemo } from 'react';
import styles from '../../styles/home/home.module.scss';
import Link from 'next/link';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Card from './Card';
import Fab from '@mui/material/Fab';
import Filter from './Filter';
import moment from 'moment';
import { useSelector } from 'react-redux';

const HomeComponent = ({ searchText }) => {
	const summaries = useSelector((state) => state.discussions.discussions);
	const [filters, setFilters] = useState({
		sort: '',
		datePosted: '',
		username: '',
		title: '',
		views: 0,
	});

	/**
	 * @description filter according to searchBar
	 */
	let filteredSummaries = useMemo(() => {
		const pattern = searchText.toLowerCase().trim();
		if (pattern === '') return summaries;

		return summaries.filter((summary) => {
			if (summary.title.toLowerCase().includes(pattern)) return true;
			if (summary.subtitle.toLowerCase().includes(pattern)) return true;
			if (summary.createdBy.toLowerCase().includes(pattern)) return true;
			return false;
		});
	}, [searchText, summaries]);

	/**
	 * @description filter according to username
	 */
	filteredSummaries = useMemo(() => {
		const filterUsername = filters.username.toLowerCase().trim();

		if (filterUsername === '') return filteredSummaries;
		return filteredSummaries.filter((summary) =>
			summary.createdBy.toLowerCase().includes(filterUsername)
		);
	}, [filters.username, filteredSummaries]);

	/**
	 * @description filter according to title
	 */
	filteredSummaries = useMemo(() => {
		const filterTitle = filters.title.toLowerCase().trim();

		if (filterTitle === '') return filteredSummaries;
		return filteredSummaries.filter((summary) =>
			summary.title.toLowerCase().includes(filterTitle)
		);
	}, [filters.title, filteredSummaries]);

	/**
	 * @description filter according to views
	 */
	filteredSummaries = useMemo(() => {
		return filteredSummaries.filter(
			(summary) => summary.metaData.views >= filters.views
		);
	}, [filters.views, filteredSummaries]);

	/**
	 * @description sort filters
	 */
	switch (filters.sort) {
		case 'views':
			filteredSummaries.sort((a, b) => a.metaData.views - b.metaData.views);
			break;
		case 'comments':
			filteredSummaries.sort((a, b) => a.comments.length - b.comments.length);
			break;
		case 'votes':
			filteredSummaries.sort(
				(a, b) =>
					a.metaData.upVotes.length -
					a.metaData.downVotes.length -
					b.metaData.upVotes.length +
					b.metaData.downVotes.length
			);
			break;
		case 'users':
			filteredSummaries.sort(
				(a, b) => a.metaData.activeUsers.length - b.metaData.activeUsers.length
			);
			break;
		default:
			filteredSummaries.sort((a, b) => a._id - b._id);
	}

	/**
	 * @description sort filter according to DatePosted
	 */
	filteredSummaries = filteredSummaries.filter((summary) => {
		switch (filters.datePosted) {
			case 'hour':
				if (moment(summary.createdAt).fromNow() === 'an hour ago') return true;
				break;
			case 'week':
				if (moment(summary.createdAt).fromNow() === 'an hour ago') return true;
				break;
			case 'month':
				break;
			default:
				return true;
		}
		return false;
	});

	return (
		<div className={styles.home}>
			<div id='start' />
			<div className={styles.content}>
				<div className={styles.left}>
					<Filter filters={filters} setFilters={setFilters} />
				</div>
				<div className={styles.right}>
					{filteredSummaries.length > 0
						? filteredSummaries.map((summary, idx) => {
								return <Card key={idx} summary={summary} />;
						  })
						: 'Refresh the page'}
				</div>
			</div>
			<div className={styles.controls}>
				<Link href='#start'>
					<Fab
						size='small'
						aria-label='scroll back to top'
						sx={{ backgroundColor: 'white' }}
					>
						<KeyboardArrowUpIcon />
					</Fab>
				</Link>
				<Link href='#end'>
					<Fab
						size='small'
						aria-label='scroll to bottom'
						sx={{ backgroundColor: 'white' }}
					>
						<KeyboardArrowDownIcon />
					</Fab>
				</Link>
			</div>
			<div id='end' />
		</div>
	);
};

export default HomeComponent;

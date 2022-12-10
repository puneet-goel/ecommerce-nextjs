import React, { useState } from 'react';
import styles from '../../styles/filter.module.scss';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Filter = ({}) => {
	const [collapse, setCollapse] = useState(false);
	const [filter, setFilter] = useState({
		sort: '',
		datePosted: '',
		username: '',
		title: '',
		views: 0,
	});

	const handleFiltering = (event) => {
		event.preventDefault();
	};

	const handleReseting = (event) => {
		event.preventDefault();
		const sortCheck = document.querySelector('input[name="sort"]:checked');
		if (sortCheck) sortCheck.checked = false;

		const dateCheck = document.querySelector(
			'input[name="datePosted"]:checked'
		);
		if (dateCheck) dateCheck.checked = false;
		setFilter({
			sort: '',
			datePosted: '',
			username: '',
			title: '',
			views: 0,
		});
	};

	const handleCheckbox = (event) => {
		const { name, value } = event.target;
		setFilter({
			...filter,
			[name]: value,
		});
		console.log(filter);
	};

	return (
		<div className={styles.filter}>
			<Button
				variant='outlined'
				className={styles.icon}
				color='info'
				onClick={() => setCollapse(!collapse)}
			>
				<div>
					<h4>Filters</h4>
					<FilterAltOutlinedIcon fontSize='large' sx={{ color: '#1976d2' }} />
				</div>

				{collapse ? <AddIcon /> : <RemoveIcon />}
			</Button>

			<div style={{ display: collapse ? 'none' : 'block' }}>
				<div className={styles.groupCheckBox}>
					<h4>Sort by</h4>
					<div className={styles.first}>
						<div>
							<input
								type='radio'
								name='sort'
								id='views'
								value='views'
								onChange={handleCheckbox}
							/>
							<label htmlFor='views'> Views </label>
						</div>
						<div>
							<input
								type='radio'
								name='sort'
								id='comments'
								value='comments'
								onChange={handleCheckbox}
							/>
							<label htmlFor='comments'> Comments </label>
						</div>
					</div>

					<div className={styles.second}>
						<div>
							<input
								type='radio'
								name='sort'
								id='users'
								value='users'
								onChange={handleCheckbox}
							/>
							<label htmlFor='users'> Users </label>
						</div>
						<div>
							<input
								type='radio'
								name='sort'
								id='votes'
								value='votes'
								onChange={handleCheckbox}
							/>
							<label htmlFor='votes'> Votes </label>
						</div>
					</div>
				</div>

				<hr />
				<div className={styles.groupCheckBox}>
					<h4>Date Posted</h4>
					<div className={styles.first}>
						<div>
							<input
								type='radio'
								name='datePosted'
								id='any'
								value='any'
								onChange={handleCheckbox}
							/>
							<label htmlFor='any'> Any Time </label>
						</div>
						<div>
							<input
								type='radio'
								name='datePosted'
								id='hour'
								value='hour'
								onChange={handleCheckbox}
							/>
							<label htmlFor='hour'> Past 24 hours </label>
						</div>
					</div>

					<div className={styles.second}>
						<div>
							<input
								type='radio'
								name='datePosted'
								id='week'
								value='week'
								onChange={handleCheckbox}
							/>
							<label htmlFor='week'> Past week </label>
						</div>
						<div>
							<input
								type='radio'
								name='datePosted'
								id='month'
								value='month'
								onChange={handleCheckbox}
							/>
							<label htmlFor='month'> Past month </label>
						</div>
					</div>
				</div>

				<hr />
				<div className={styles.textinput}>
					<h4>Search by username</h4>
					<input
						type='text'
						id='username'
						name='username'
						placeholder='Username'
						value={filter.username}
						onChange={(val) =>
							setFilter({ ...filter, username: val.target.value })
						}
					/>
				</div>

				<div className={styles.textinput}>
					<h4>Search by Title</h4>
					<input
						type='text'
						id='title'
						name='title'
						placeholder='Title'
						value={filter.title}
						onChange={(val) =>
							setFilter({ ...filter, title: val.target.value })
						}
					/>
				</div>

				<hr />
				<div className={styles.range}>
					<h4>Minimum Views: {filter.views}</h4>
					<input
						type='range'
						id='views'
						name='views'
						min='0'
						max='1000'
						value={filter.views}
						onChange={(val) =>
							setFilter({ ...filter, views: val.target.value })
						}
					/>
				</div>

				<div className={styles.apply}>
					<Button
						variant='contained'
						onClick={handleReseting}
						color='success'
						sx={{ marginRight: '5px' }}
					>
						Reset
					</Button>
					<Button variant='contained' onClick={handleFiltering}>
						Apply
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Filter;
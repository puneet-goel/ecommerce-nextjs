import { useState } from 'react';
import styles from 'styles/search/filter.module.scss';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Tooltip from '@mui/material/Tooltip';

const Filter = ({ filters, setFilters }) => {
	const [collapse, setCollapse] = useState(false);

	const handleReseting = (event) => {
		event.preventDefault();
		const sortCheck = document.querySelector('input[name="sort"]:checked');
		if (sortCheck) sortCheck.checked = false;

		const dateCheck = document.querySelector(
			'input[name="datePosted"]:checked'
		);
		if (dateCheck) dateCheck.checked = false;
		setFilters({
			sort: '',
			stars: 0,
			category: '',
			title: '',
			price: 0,
		});
	};

	const handleCheckbox = (event) => {
		const { name, value } = event.target;
		setFilters({
			...filters,
			[name]: value,
		});
	};

	return (
		<div className={`${styles.filter} elevation`}>
			<button
				className={`${styles.icon} button button_outlined`}
				onClick={() => setCollapse(!collapse)}
			>
				<div>
					<FilterAltOutlinedIcon fontSize='large' />
					<h4>Filters</h4>
				</div>

				{collapse ? <AddIcon /> : <RemoveIcon />}
			</button>

			<div style={{ display: collapse ? 'none' : 'block' }}>
				<div className={styles.group_check_box}>
					<h4>Sort by</h4>
					<div className={styles.first}>
						<div>
							<input
								type='radio'
								name='sort'
								id='rating'
								value='rating'
								onChange={handleCheckbox}
							/>
							<label htmlFor='rating'> Rating </label>
						</div>
						<div>
							<input
								type='radio'
								name='sort'
								id='arrivals'
								value='arrivals'
								onChange={handleCheckbox}
							/>
							<label htmlFor='arrivals'> Arrivals </label>
						</div>
					</div>

					<div className={styles.second}>
						<div>
							<input
								type='radio'
								name='sort'
								id='lh-price'
								value='lh-price'
								onChange={handleCheckbox}
							/>
							<label htmlFor='lh-price'> Low to high Price </label>
						</div>
						<div>
							<input
								type='radio'
								name='sort'
								id='hl-price'
								value='hl-price'
								onChange={handleCheckbox}
							/>
							<label htmlFor='hl-price'> High to Low Price </label>
						</div>
					</div>
				</div>

				<hr />
				<div className={styles.group_review_stars}>
					<h4>Customer Reviews</h4>
					{[...Array(4).keys()].reverse().map((id) => {
						return (
							<Tooltip
								placement='bottom'
								title={`${id + 1} or more stars`}
								key={id}
							>
								<div onClick={() => setFilters({ ...filters, stars: id + 1 })}>
									{[...Array(id + 1).keys()].map((id2) => {
										return <StarIcon key={id2} className={styles.golden_svg} />;
									})}
									{[...Array(4 - id).keys()].map((id2) => {
										return (
											<StarBorderIcon key={id2} className={styles.golden_svg} />
										);
									})}
									<span>& Up</span>
								</div>
							</Tooltip>
						);
					})}
				</div>

				<hr />
				<div className={styles.textinput}>
					<h4>Search by Category</h4>
					<input
						className='input'
						type='text'
						id='category'
						name='category'
						placeholder='Category'
						autoComplete='off'
						value={filters.category}
						onChange={(val) =>
							setFilters({ ...filters, category: val.target.value })
						}
					/>
				</div>

				<div className={styles.textinput}>
					<h4>Search by Product Name</h4>
					<input
						className='input'
						type='text'
						id='title'
						name='title'
						placeholder='Product Name'
						autoComplete='off'
						value={filters.title}
						onChange={(val) =>
							setFilters({ ...filters, title: val.target.value })
						}
					/>
				</div>

				<hr />
				<div className={styles.range}>
					<h4>Minimum Price: {filters.price}</h4>
					<input
						type='range'
						id='price'
						name='price'
						min='0'
						max='100000'
						value={filters.price}
						onChange={(val) =>
							setFilters({ ...filters, price: val.target.value })
						}
					/>
				</div>

				<div className={styles.apply}>
					<button className='button' onClick={handleReseting}>
						Reset
					</button>
				</div>
			</div>
		</div>
	);
};

export default Filter;

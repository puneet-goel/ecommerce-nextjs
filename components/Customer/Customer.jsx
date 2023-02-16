import { useState } from 'react';
import styles from 'styles/customer.module.scss';
import Rating from '@mui/material/Rating';
import {
	getUserEmail,
	createToken as payloadHeader,
	perc2color,
} from 'utility/client.js';
import Image from 'next/Image';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useRouter } from 'next/router';
import Tooltip from '@mui/material/Tooltip';
import 'react-circular-progressbar/dist/styles.css';

const CustomerComponent = ({ complaints }) => {
	const [data, setData] = useState({
		query: 'Other issue',
		description: '',
		feedback: 5,
	});

	const router = useRouter();

	const register = async (e) => {
		e.preventDefault();
		const x = getUserEmail();

		if (!x) {
			return router.push('/login');
		}

		const toastID = toast.loading('Registering your Query');

		try {
			const {
				data: { message },
			} = await axios.post('/api/complaint', data, payloadHeader());

			if (message === 'ok') {
				toast.update(toastID, {
					render: 'Successfully Registered',
					type: 'success',
					hideProgressBar: true,
					isLoading: false,
					autoClose: 3000,
				});
			} else {
				toast.update(toastID, {
					render: 'Could not register your query',
					type: 'error',
					hideProgressBar: true,
					isLoading: false,
					autoClose: 3000,
				});
			}
		} catch (err) {
			toast.update(toastID, {
				render: 'Could not register your query',
				type: 'error',
				hideProgressBar: true,
				isLoading: false,
				autoClose: 3000,
			});
		}
	};

	const ert = Math.floor((complaints.timeTook / 100) * 24);

	return (
		<div className={'min_container_height ' + styles.customer_wrapper}>
			<h1>Customer Query</h1>
			<div className={styles.customer_stats}>
				<Tooltip title='Queries Resolved' arrow placement='top'>
					<div className={styles.progress_bar}>
						<CircularProgressbar
							value={complaints.resolve}
							text={`${complaints.resolve}%`}
							background
							backgroundPadding={3}
							styles={buildStyles({
								backgroundColor: perc2color(complaints.resolve),
								textColor: 'floralwhite',
								pathColor: 'floralwhite',
								trailColor: 'transparent',
							})}
						/>
					</div>
				</Tooltip>
				<Tooltip
					title='Expected Resolution Time (out of 24 hours)'
					arrow
					placement='top'
				>
					<div className={styles.progress_bar}>
						<CircularProgressbar
							value={complaints.timeTook}
							text={`${ert} hrs`}
							background
							backgroundPadding={3}
							styles={buildStyles({
								backgroundColor: perc2color(100 - complaints.timeTook),
								textColor: 'floralwhite',
								pathColor: 'floralwhite',
								trailColor: 'transparent',
							})}
						/>
					</div>
				</Tooltip>
				<Tooltip title='Feedback Rating' arrow placement='top'>
					<div className={styles.progress_bar}>
						<CircularProgressbar
							value={complaints.rating}
							text={`${complaints.rating}%`}
							background
							backgroundPadding={3}
							styles={buildStyles({
								backgroundColor: perc2color(complaints.rating),
								textColor: 'floralwhite',
								pathColor: 'floralwhite',
								trailColor: 'transparent',
							})}
						/>
					</div>
				</Tooltip>
			</div>
			<div className={styles.container}>
				<Image
					src='/customer-care/customer-care.jpg'
					width='2000'
					height='3000'
					alt='customer care banner'
				/>
				<form onSubmit={register}>
					<h1>We are here to assist you!</h1>
					<label name='query'>Query Type:</label>
					<select name='query' className='input' required>
						<option value=''>--Please choose an option--</option>
						<option value='General Query'>General Query</option>
						<option value='Package not Delivered'>Package not Delivered</option>
						<option value='Missing Item'>Missing Item</option>
						<option value='Wrong Package'>Wrong Package</option>
						<option value='Complaint against executive'>
							Complaint against executive
						</option>
						<option value='Other Issue'>Other Issue</option>
					</select>

					<label name='description'>Query Description:</label>
					<textarea
						className='input'
						required
						value={data.description}
						onChange={(e) =>
							setData((prev) => ({
								...prev,
								description: e.target.value,
							}))
						}
						rows={12}
						name='description'
					/>

					<label name='feeback-rating'>Feedback:</label>
					<div className={styles.feedback_rating}>
						<Rating
							name='feeback-rating'
							value={data.feedback}
							precision={0.5}
							size='large'
							onChange={(event, newValue) => {
								setData((prev) => ({ ...prev, feedback: newValue }));
							}}
						/>
						<strong>{data.feedback}</strong>
					</div>

					<div className={styles.submit_button}>
						<button type='submit' className='button'>
							Register
						</button>
					</div>
				</form>
			</div>

			<ToastContainer />
		</div>
	);
};

export default CustomerComponent;

import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import styles from 'styles/specific_product.module.scss';
import dynamic from 'next/dynamic';
import * as React from 'react';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import {
	createToken as payloadHeader,
	getUserEmail,
	stringToColor,
} from 'utility/client.js';
import moment from 'moment';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import parse from 'html-react-parser';

const TextEditor = dynamic(
	() => import('components/TextEditor/TextEditor.jsx'),
	{
		ssr: false,
	}
);

const Reviews = ({ reviews, _id }) => {
	const [modal, setModal] = useState(false);
	const [textData, setTextData] = useState('');
	const [value, setValue] = useState(2.5);

	const router = useRouter();

	const handleModal = (e) => {
		e.preventDefault();
		if (getUserEmail() === '') {
			router.push('/signup');
		} else {
			setModal((prev) => !prev);
		}
	};

	const handleReviewSubmit = async (e) => {
		const toastID = toast.loading('Submitting your review');
		try {
			const {
				data: { message },
			} = await axios.post(
				'/api/product/review',
				{
					message: textData,
					rating: value,
					_id,
				},
				payloadHeader()
			);

			if (message === 'ok') {
				toast.update(toastID, {
					render: 'Successfully added you review',
					type: 'success',
					hideProgressBar: true,
					isLoading: false,
					autoClose: 3000,
				});
				if (window) {
					window.location.reload();
				}
			} else {
				throw 'Error';
			}
		} catch (err) {
			toast.update(toastID, {
				render: 'Could not add your review',
				type: 'error',
				hideProgressBar: true,
				isLoading: false,
				autoClose: 3000,
			});
		}

		setModal(false);
	};

	return (
		<div className={styles.product_reviews}>
			<div className={styles.review_button}>
				<button className='button' onClick={handleModal}>
					Review
				</button>
			</div>
			<div className={styles.reviews}>
				{reviews.map((cur, idx) => {
					return (
						<div key={idx} className={`${styles.review_box} elevation`}>
							<div className={styles.review_header}>
								<div
									className='avatar'
									style={{
										backgroundColor: stringToColor(cur.commentedBy),
									}}
								>
									<p className='avatar_text'>
										{cur.commentedBy.split('@')[0][0]}
									</p>
								</div>
								<span>{cur.commentedBy}</span>
							</div>
							<div className={styles.review_time}>
								{moment(cur.createdAt).fromNow()}
							</div>

							<div className={styles.review_rating}>
								<Rating
									name='user-review-rating'
									value={cur.rating}
									precision={0.5}
									readOnly
								/>
								<strong>{cur.rating}</strong>
							</div>
							{parse(cur.message)}
						</div>
					);
				})}
			</div>

			{modal && (
				<div className='modal' onClick={handleModal}>
					<div className='modal_wrapper' onClick={(e) => e.stopPropagation()}>
						<div className='modal_content'>
							<h1 className={styles.review_modal_header}> Add Review </h1>
							<div className={styles.review_modal_rating}>
								<Rating
									name='half-rating'
									value={value}
									precision={0.5}
									size='large'
									onChange={(event, newValue) => {
										setValue(newValue);
									}}
								/>
								<strong>{value}</strong>
							</div>
							<h3>Message: </h3>
							<br />
							<TextEditor textData={textData} setTextData={setTextData} />
							<button
								className={`button ${styles.review_modal_button}`}
								onClick={handleReviewSubmit}
							>
								Submit Review
							</button>
						</div>
						<button className='close' onClick={handleModal}>
							<CloseIcon fontSize='large' />
						</button>
					</div>
				</div>
			)}
			<ToastContainer />
		</div>
	);
};

export default Reviews;

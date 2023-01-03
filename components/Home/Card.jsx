import { useState } from 'react';
import styles from '../../styles/home/card.module.scss';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Groups3Icon from '@mui/icons-material/Groups3';
import ForumTwoToneIcon from '@mui/icons-material/ForumTwoTone';
import moment from 'moment';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext.jsx';
import { useDispatch } from 'react-redux';
import { updateVote } from '../../store/discussionSlice.js';

const Card = ({ summary }) => {
	const dispatch = useDispatch();
	const { user } = useAuth();

	const totalVotes =
		summary.metaData.upVotes?.length - summary.metaData.downVotes?.length;
	const upvote = summary.metaData.upVotes.find((cur) => cur === user.email);
	const downvote = summary.metaData.downVotes.find((cur) => cur === user.email);

	const handleUpVote = (e) => {
		dispatch(
			updateVote({
				discussionId: summary._id,
				email: user.email,
				action: 'upvote',
			})
		);
		e.preventDefault();
	};

	const handleDownVote = (e) => {
		dispatch(
			updateVote({
				discussionId: summary._id,
				email: user.email,
				action: 'downvote',
			})
		);
		e.preventDefault();
	};

	return (
		<Link
			href={`/discussion/${summary._id}`}
			className={`${styles.card} elevation`}
		>
			<div className={styles.header}>
				<div className={styles.functionality}>
					<ArrowDropUpIcon
						fontSize='large'
						sx={{ color: 'gray' }}
						onClick={handleUpVote}
						className={`${styles.green} ${upvote ? 'success_text' : ''}`}
					/>
					<p>{totalVotes}</p>
					<ArrowDropDownIcon
						fontSize='large'
						sx={{ color: 'gray' }}
						onClick={handleDownVote}
						className={`${styles.red} ${downvote ? 'alert_text' : ''}`}
					/>
				</div>
				<div className={styles.content}>
					<em>
						by {summary.createdBy}, {moment(summary.createdAt).fromNow()}
					</em>
					<div className={styles.subcontent}>
						<h2> {summary.title} </h2>
						<p> {summary.subtitle} </p>
					</div>
				</div>
			</div>

			<div className={styles.footer}>
				<span>
					<Groups3Icon sx={{ color: 'gray' }} />
					{summary.metaData.activeUsers?.length}
				</span>
				<span>
					<VisibilityIcon sx={{ color: 'gray' }} />
					{summary.metaData.views}
				</span>
				<span>
					<ForumTwoToneIcon sx={{ color: 'gray' }} />
					{summary.comments?.length}
				</span>
			</div>
		</Link>
	);
};

export default Card;

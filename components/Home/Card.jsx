import React, { useState } from 'react';
import styles from '../../styles/card.module.scss';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Groups3Icon from '@mui/icons-material/Groups3';
import ForumTwoToneIcon from '@mui/icons-material/ForumTwoTone';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Card = ({ summary }) => {
	const [totalVotes, setTotalVotes] = useState(0);
	const router = useRouter();

	const handleUpVote = (e) => {
		e.preventDefault();
	};

	const handleDownVote = (e) => {
		e.preventDefault();
	};

	return (
		<Link href={`/discussion/${summary.title}`}>
			<div className={styles.card}>
				<div className={styles.header}>
					<div className={styles.functionality}>
						<ArrowDropUpIcon
							fontSize='large'
							sx={{ color: 'gray' }}
							onClick={handleUpVote}
							className={styles.green}
						/>
						<p>{totalVotes}</p>
						<ArrowDropDownIcon
							fontSize='large'
							sx={{ color: 'gray' }}
							onClick={handleDownVote}
							className={styles.red}
						/>
					</div>
					<div className={styles.content}>
						<em>
							by {summary.createdBy}, {moment(summary.createAt).fromNow()}
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
						{summary.comments}
					</span>
					<span>
						<VisibilityIcon sx={{ color: 'gray' }} />
						{summary.views}
					</span>
					<span>
						<ForumTwoToneIcon sx={{ color: 'gray' }} />
						{summary.activeUsers}
					</span>
				</div>
			</div>
		</Link>
	);
};

export default Card;

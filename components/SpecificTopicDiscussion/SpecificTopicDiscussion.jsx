import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateView } from '../../store/discussionSlice.js';
import styles from '../../styles/specific_discussion.module.scss';

const SpecificTopicDiscussionComponent = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const discussionID = router.query.discussionID;
	const discussion = useSelector((state) => {
		return state.discussions.discussions.find(
			(cur) => discussionID === cur._id
		);
	});

	useEffect(() => {
		if (discussionID) dispatch(updateView(discussionID));
	}, [dispatch, discussionID]);

	return (
		<div style={{ marginTop: '70px' }}>
			{!discussion ? (
				'No such post reroute to 404'
			) : (
				<button type='submit' className='button'>
					View Discussion
				</button>
			)}
		</div>
	);
};

export default SpecificTopicDiscussionComponent;

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { updateView } from 'store/discussionSlice.js';
// import styles from 'styles/specific_discussion.module.scss';

const SpecificProductComponent = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const discussionId = router.query.discussionId;
	// const discussion = useSelector((state) => {
	// 	return state.discussions.discussions.find(
	// 		(cur) => discussionId === cur._id
	// 	);
	// });

	useEffect(() => {
		// if (discussionId) dispatch(updateView(discussionId));
	}, [dispatch, discussionId]);

	return (
		<div style={{ marginTop: '70px' }}>
			{!discussion ? (
				'No such post reroute to 404'
			) : (
				<button type='submit' className='button'>
					View Product
				</button>
			)}
		</div>
	);
};

export default SpecificProductComponent;

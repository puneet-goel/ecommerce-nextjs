import { useRouter } from 'next/router';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext.jsx';
import { useDispatch } from 'react-redux';
import { createDiscussion } from '../../store/discussionSlice.js';
import styles from '../../styles/create_topic.module.scss';

const CreateTopicComponent = () => {
	const router = useRouter();
	const { user } = useAuth();
	const dispatch = useDispatch();
	const [data, setData] = useState({
		title: 'p',
		subtitle: 'p',
		message: 'p',
		tags: 'p',
	});

	const handleChange = (e) => {
		e.preventDefault();
		setData({
			...data,
			[e.target.name]: e.target.value,
		});
	};

	const handleCreate = async (e) => {
		e.preventDefault();

		const toastID = toast.loading('Creating your topic');
		const { type } = await dispatch(
			createDiscussion({ ...data, createdBy: user.email })
		);

		if (type === 'discussion/createDiscussion/fulfilled') {
			toast.dismiss(toastID);
			router.push('/');
		} else {
			toast.update(toastID, {
				render: 'Could not create your topic',
				type: 'error',
				hideProgressBar: true,
				isLoading: false,
				autoClose: 3000,
			});
		}
	};

	return (
		<>
			<button
				type='submit'
				className='button'
				style={{ marginTop: '80px' }}
				onClick={handleCreate}
			>
				Create your discussion
			</button>
			<ToastContainer />
		</>
	);
};

export default CreateTopicComponent;

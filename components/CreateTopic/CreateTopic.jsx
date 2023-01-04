import { useRouter } from 'next/router';
import { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext.jsx';
import { useDispatch } from 'react-redux';
import { createDiscussion } from '../../store/discussionSlice.js';
import dynamic from 'next/dynamic';
import styles from '../../styles/create_topic.module.scss';

const TextEditor = dynamic(() => import('../TextEditor/TextEditor.jsx'), {
	ssr: false,
});

const CreateTopicComponent = () => {
	const router = useRouter();
	const { user } = useAuth();
	const dispatch = useDispatch();
	const [data, setData] = useState({
		title: '',
		subtitle: '',
		tags: '',
	});

	const [textData, setTextData] = useState('');
	const err = useRef({
		title: '',
		subtitle: '',
	});

	const handleChange = (e) => {
		e.preventDefault();

		if (e.target.name === 'title') {
			if (e.target.value === '') {
				err.current.title = 'Title cannot be empty';
			} else {
				err.current.title = '';
			}
		} else if (e.target.name === 'subtitle') {
			if (e.target.value === '') {
				err.current.subtitle = 'Subtitle cannot be empty';
			} else {
				err.current.subtitle = '';
			}
		}

		setData({
			...data,
			[e.target.name]: e.target.value,
		});
	};

	const handleClear = (e) => {
		e.preventDefault();
		setData({
			title: '',
			subtitle: '',
			tags: '',
		});
		setTextData('');
	};

	const handlePublish = async (e) => {
		e.preventDefault();

		if (data.title === '') {
			err.current.title = 'Title cannot be empty';
		}
		if (data.subtitle === '') {
			err.current.subtitle = 'Subtitle cannot be empty';
		}

		if (err.current.title !== '' || err.current.subtitle !== '') {
			setData({
				...data,
				tags: data.tags,
			});
			return;
		}

		const toastID = toast.loading('Creating your topic');
		const { type } = await dispatch(
			createDiscussion({ ...data, createdBy: user.email, message: textData })
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
		<div className={styles.create_topic_container}>
			<div className={styles.topic_heading}>
				<h1> Create New Topic</h1>
			</div>
			<div>
				<div className='input_floating_label'>
					<input
						className='input'
						onChange={handleChange}
						value={data.title}
						name='title'
						type='text'
					/>
					<label>Title</label>
					<span className='alert_text'>{err.current.title}</span>
				</div>
				<div className='input_floating_label'>
					<input
						className='input'
						onChange={handleChange}
						value={data.subtitle}
						name='subtitle'
						type='text'
					/>
					<label>Subtitle</label>
					<span className='alert_text'>{err.current.subtitle}</span>
				</div>
				<div className='input_floating_label'>
					<input
						className='input'
						onChange={handleChange}
						value={data.tags}
						name='tags'
						type='text'
					/>
					<label>Tags</label>
				</div>
			</div>

			<div className={styles.topic_editor}>
				<p>Question</p>
				<TextEditor textData={textData} setTextData={setTextData} />
			</div>
			<div className={styles.topic_controls}>
				<button
					type='submit'
					className='button button_outlined'
					onClick={handleClear}
				>
					Clear
				</button>
				<button type='submit' className='button' onClick={handlePublish}>
					Publish
				</button>
			</div>
			<ToastContainer />
		</div>
	);
};

export default CreateTopicComponent;

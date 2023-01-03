import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { ToastContainer, toast } from 'react-toastify';
import styles from '../../styles/auth.module.scss';
import Link from 'next/link';

const SignupComponent = () => {
	const router = useRouter();
	const { signup } = useAuth();
	const [data, setData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [error, setError] = useState('');

	const handleChange = (e) => {
		e.preventDefault();
		setData({
			...data,
			[e.target.name]: e.target.value,
		});
	};

	const handleSignup = async (e) => {
		e.preventDefault();
		if (data.password !== data.confirmPassword) {
			setError('Password must match');
			return;
		} else {
			setError('');
		}

		const toastID = toast.loading('Creating your account');

		const status = await signup(data.email, data.password);
		if (status) {
			router.push('/');
		} else {
			toast.update(toastID, {
				render: 'Could not create your account',
				type: 'error',
				hideProgressBar: true,
				isLoading: false,
				autoClose: 3000,
			});
		}
	};

	return (
		<>
			<div className='bubbles'>
				<div className='bubble' />
				<div className='bubble' />
				<div className='bubble' />
				<div className='bubble' />
			</div>
			<div className={styles.auth_container}>
				<div className={`${styles.auth_box} elevation`}>
					<h1>Sign Up</h1>
					<p>
						Already a Member?&nbsp;<Link href='/login'>Login</Link>
					</p>
					<form onSubmit={handleSignup}>
						<div className='input_floating_label'>
							<input
								className='input'
								onChange={handleChange}
								value={data.email}
								type='email'
								name='email'
								required
							/>
							<label>Email</label>
						</div>

						<div className='input_floating_label'>
							<input
								className='input'
								onChange={handleChange}
								value={data.password}
								type='password'
								minLength={6}
								required
								name='password'
							/>
							<label>Password</label>
						</div>

						<div className='input_floating_label'>
							<input
								className='input'
								onChange={handleChange}
								value={data.confirmPassword}
								type='password'
								minLength={6}
								required
								name='confirmPassword'
							/>
							<label>Confirm Password</label>
							<p className='alert_text'>{error}</p>
						</div>
						<button type='submit' className='button'>
							Sign up
						</button>
					</form>
				</div>
				<ToastContainer />
			</div>
		</>
	);
};

export default SignupComponent;

import { useRouter } from 'next/router';
import { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import styles from '../../styles/signup.module.scss';
import Link from 'next/link';

const SignupComponent = () => {
	const router = useRouter();
	const { user, signup } = useAuth();
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

		const status = await signup(data.email, data.password);
		if (status) {
			router.push('/');
		}
	};

	return (
		<div className={styles.signup_container}>
			<div className={`${styles.signup_box} elevation`}>
				<h1>Sign Up</h1>
				<p>
					or&nbsp;<Link href='/signup'>already have an account</Link>
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
		</div>
	);
};

export default SignupComponent;

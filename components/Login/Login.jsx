import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { ToastContainer, toast } from 'react-toastify';
import styles from '../../styles/auth.module.scss';
import Link from 'next/link';

const LoginComponent = () => {
	const router = useRouter();
	const { login } = useAuth();
	const [data, setData] = useState({
		email: '',
		password: '',
	});

	const handleChange = (e) => {
		e.preventDefault();
		setData({
			...data,
			[e.target.name]: e.target.value,
		});
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		const toastID = toast.loading('Logging in');
		const status = await login(data.email, data.password);
		if (status) {
			toast.dismiss(toastID);
			router.push('/');
		} else {
			toast.update(toastID, {
				render: 'Could not log in to your account',
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
					<h1>Log in</h1>
					<p>
						Not a member?&nbsp;<Link href='/signup'>Register now</Link>
					</p>
					<form onSubmit={handleLogin}>
						<div className='input_floating_label'>
							<input
								className='input'
								onChange={handleChange}
								value={data.email}
								type='email'
								required
								name='email'
							/>
							<label>Email</label>
						</div>

						<div className='input_floating_label'>
							<input
								className='input'
								onChange={handleChange}
								value={data.password}
								name='password'
								minLength={6}
								required
								type='password'
							/>
							<label>Password</label>
						</div>
						<button type='submit' className='button'>
							Log in
						</button>
					</form>
					<Link href='/reset-password'>
						<div className={styles.auth_footer}>Recover Password</div>
					</Link>
				</div>
				<ToastContainer />
			</div>
		</>
	);
};

export default LoginComponent;

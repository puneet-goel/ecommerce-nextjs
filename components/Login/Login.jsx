import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import styles from '../../styles/login.module.scss';
import Link from 'next/link';

const LoginComponent = () => {
	const router = useRouter();
	const { user, login } = useAuth();
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
		const status = await login(data.email, data.password);
		if (status) {
			router.push('/');
		}
	};

	return (
		<div className={styles.login_container}>
			<div className={`${styles.login_box} elevation`}>
				<h1>Log in</h1>
				<p>
					or&nbsp;<Link href='/signup'>create an account</Link>
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
			</div>
		</div>
	);
};

export default LoginComponent;

import { useState } from 'react';
import { resetPassword } from 'firebase-auth/firebase-client.js';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';
import styles from 'styles/auth.module.scss';

const ResetPasswordComponent = () => {
	const [data, setData] = useState({
		email: '',
	});

	const handleChange = (e) => {
		e.preventDefault();
		setData({
			...data,
			[e.target.name]: e.target.value,
		});
	};

	const handleResetPassword = async (e) => {
		e.preventDefault();
		const toastID = toast.loading('Sending Email');
		const status = await resetPassword(data.email);
		if (status) {
			toast.update(toastID, {
				render: 'Email sent, please check your inbox for further instructions',
				type: 'success',
				hideProgressBar: true,
				isLoading: false,
				autoClose: 3000,
			});
		} else {
			toast.update(toastID, {
				render: 'Failed to reset password',
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
					<h1>Forgot Your Password?</h1>
					<p>
						Enter the email address associated with your account and we&apos;ll
						send you a link to reset your password.
					</p>
					<form onSubmit={handleResetPassword}>
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
						<button type='submit' className='button'>
							reset password
						</button>
					</form>
					<Link href='/login'>
						<div className={styles.auth_footer}>Login</div>
					</Link>
				</div>
				<ToastContainer />
			</div>
		</>
	);
};

export default ResetPasswordComponent;

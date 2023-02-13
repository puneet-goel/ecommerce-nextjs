import React from 'react';
import styles from 'styles/profile.module.scss';
import Link from 'next/link';
import Image from 'next/Image';
import {
	createToken as payloadHeader,
	toBase64,
	getUserEmail,
} from 'utility/client.js';
import PhoneInput, {
	isPossiblePhoneNumber,
	formatPhoneNumberIntl,
} from 'react-phone-number-input';
import LaunchIcon from '@mui/icons-material/Launch';
import 'react-phone-number-input/style.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

class ProfileComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: getUserEmail(),
			imageFile: '',
			imageLoc: '/profile/account.png',
			infoData: {
				firstName: '',
				lastName: '',
				phoneNo: '',
				address: '',
				about: '',
			},
		};

		this.handleProfileSave = this.handleProfileSave.bind(this);
	}

	async componentDidMount() {
		try {
			const { data } = await axios.get('/api/user', payloadHeader());

			if (data.message === 'ok') {
				this.setState({
					email: data.data.email,
					imageLoc: data.data.image.file || this.state.imageLoc,
					infoData: {
						...data.data.infoData,
						phoneNo: data.data.infoData.phoneNo,
					},
				});
			}
		} catch (err) {
			console.error(err);
		}
	}

	handleProfileSave = async (e) => {
		e.preventDefault();
		const toastID = toast.loading('Updating your profile');

		const user = {
			fileData: null,
			infoData: this.state.infoData,
		};

		try {
			if (this.state.imageFile) {
				const base64 = await toBase64(this.state.imageFile);
				user.fileData = {
					base64,
					fileName: this.state.imageFile.name,
				};
			}

			const { data } = await axios.patch('/api/user', user, payloadHeader());

			if (data.message === 'ok') {
				toast.update(toastID, {
					render: 'Profile updated successfully',
					type: 'success',
					hideProgressBar: true,
					isLoading: false,
					autoClose: 3000,
				});
			} else {
				toast.update(toastID, {
					render: 'Could not update your profile',
					type: 'error',
					hideProgressBar: true,
					isLoading: false,
					autoClose: 3000,
				});
			}
		} catch (err) {
			toast.update(toastID, {
				render: 'Could not update your profile',
				type: 'error',
				hideProgressBar: true,
				isLoading: false,
				autoClose: 3000,
			});
		}
	};

	render() {
		return (
			<div className={styles.profile_wrapper}>
				<div className={styles.profile_sidebar} id='bookmark'>
					<ul>
						<li>
							<Link href='#profile_photo'>Photo</Link>
						</li>
						<li>
							<Link href='#profile_information'>Information</Link>
						</li>
						<li>
							<Link href='#profile_phone'>Phone</Link>
						</li>
						<li>
							<Link href='#profile_details'>Details</Link>
						</li>
						<li>
							<Link href='#user_products'>My Products</Link>
						</li>
						<li>
							<Link href='#profile_update_password'>Update Password</Link>
						</li>
					</ul>
				</div>
				<div className={styles.profile_container}>
					<form onSubmit={this.handleProfileSave}>
						<div className={styles.profile_subcontainer} id='profile_photo'>
							<h1>Photo</h1>
							<hr />
							<div className={styles.content_photo}>
								<div>
									<Image
										src={
											this.state.imageFile
												? URL.createObjectURL(this.state.imageFile)
												: this.state.imageLoc
										}
										width={200}
										height={200}
										alt='profile'
									/>
								</div>
								<br />
								<input
									name='image'
									type='file'
									accept='image/*'
									className='input'
									onChange={(e) => {
										this.setState((prev) => ({
											...prev,
											imageFile: e.target.files[0],
										}));
									}}
								/>
							</div>
						</div>

						<div
							className={styles.profile_subcontainer}
							id='profile_information'
						>
							<h1>Information</h1>
							<hr />

							<div className={styles.profile_input_box}>
								<label>Email:</label>
								<div>
									<input
										className='input'
										value={this.state.email}
										type='email'
										name='email'
										disabled='disabled'
									/>
								</div>
							</div>

							<div className={styles.profile_input_box}>
								<label>First Name:</label>
								<div className='input_floating_label'>
									<input
										className='input'
										value={this.state.infoData.firstName}
										onChange={(e) =>
											this.setState((prev) => ({
												...prev,
												infoData: {
													...prev.infoData,
													firstName: e.target.value,
												},
											}))
										}
										type='text'
										name='firstname'
									/>
									<label>First Name</label>
								</div>
							</div>

							<div className={styles.profile_input_box}>
								<label>Last Name:</label>
								<div className='input_floating_label'>
									<input
										className='input'
										value={this.state.infoData.lastName}
										onChange={(e) =>
											this.setState((prev) => ({
												...prev,
												infoData: {
													...prev.infoData,
													lastName: e.target.value,
												},
											}))
										}
										type='text'
										name='lastname'
									/>
									<label>Last Name</label>
								</div>
							</div>
						</div>

						<div className={styles.profile_subcontainer} id='profile_phone'>
							<h1>Phone Number Settings</h1>
							<hr />
							<PhoneInput
								international
								placeholder='Enter phone number'
								defaultCountry='IN'
								value={formatPhoneNumberIntl(this.state.infoData.phoneNo)}
								onChange={(e) =>
									e &&
									this.setState((prev) => ({
										...prev,
										infoData: {
											...prev.infoData,
											phoneNo: e,
										},
									}))
								}
							/>
							<span className='alert_text'>
								{this.state.infoData.phoneNo &&
									!isPossiblePhoneNumber(this.state.infoData.phoneNo) &&
									'Invalid Phone Number'}
							</span>
						</div>

						<div className={styles.profile_subcontainer} id='profile_details'>
							<h1>Details</h1>
							<hr />

							<div className={styles.profile_input_box}>
								<label>Address:</label>
								<textarea
									className='input'
									value={this.state.infoData.address}
									onChange={(e) =>
										this.setState((prev) => ({
											...prev,
											infoData: {
												...prev.infoData,
												address: e.target.value,
											},
										}))
									}
									rows={6}
									name='address'
								/>
							</div>

							<div className={styles.profile_input_box}>
								<label>About:</label>
								<textarea
									className='input'
									value={this.state.infoData.about}
									onChange={(e) =>
										this.setState((prev) => ({
											...prev,
											infoData: {
												...prev.infoData,
												about: e.target.value,
											},
										}))
									}
									rows={6}
									name='about'
								/>
							</div>
						</div>

						<div className={styles.apply_button}>
							<button type='submit' className='button'>
								Apply changes
							</button>
						</div>
					</form>

					<div className={styles.profile_subcontainer} id='user_products'>
						<h1>My Products</h1>
						<hr />
						<Link href='/update-product'>
							<LaunchIcon fontSize='small' />
							&nbsp; List of all the products you added.
						</Link>
					</div>

					<div
						className={styles.profile_subcontainer}
						id='profile_update_password'
					>
						<h1>Update/Forgot Password</h1>
						<hr />
						<Link href='/reset-password'>
							<LaunchIcon fontSize='small' />
							&nbsp; Link to update your password.
						</Link>
					</div>
				</div>
				<ToastContainer />
			</div>
		);
	}
}

export default ProfileComponent;

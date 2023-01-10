import { useFormik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/Image';
import styles from 'styles/add_product.module.scss';

const schema = Yup.object().shape({
	title: Yup.string().min(3, 'Too Short').required('Required'),
	image: Yup.mixed().required('Required'),
});

const Stepper1 = ({ title, image, setData }) => {
	const formik = useFormik({
		initialValues: {
			title,
			image,
		},
		validationSchema: schema,
		onSubmit: (values) => {
			setData((data) => ({
				...data,
				title: values.title,
				image: values.image,
				activeStep: data.activeStep + 1,
			}));
		},
	});

	return (
		<div className={styles.stepper1}>
			<form onSubmit={formik.handleSubmit}>
				<div className='input_floating_label'>
					<input
						name='title'
						type='string'
						autoComplete='off'
						className='input'
						value={formik.values.title}
						onChange={formik.handleChange}
					/>
					<label htmlFor='title'>Product Name</label>
					<span name='title' className='alert_text'>
						{formik.errors.title}
					</span>
				</div>

				<div className={styles.input_group}>
					<label htmlFor='image'>Upload Product Image</label>
					<br />
					<input
						name='image'
						type='file'
						accept='image/*'
						className='input'
						onChange={(e) => {
							formik.setFieldValue('image', e.target.files[0]);
						}}
					/>
					<span name='image' className='alert_text'>
						{formik.errors.image}
					</span>
				</div>

				{formik.values.image && (
					<Image
						src={URL.createObjectURL(formik.values.image)}
						alt='product image'
						height={200}
						width={200}
					/>
				)}

				<div className={styles.product_controls}>
					<button type='submit' className='button button_outlined'>
						Next
					</button>
				</div>
			</form>
		</div>
	);
};

export default Stepper1;

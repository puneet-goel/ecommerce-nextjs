import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from 'styles/add_product.module.scss';

const schema = Yup.object().shape({
	color: Yup.string(),
	size: Yup.string(),
	quantity: Yup.number().min(1, 'Quantity cannot be 0').required('Required'),
	category: Yup.string().required('Required'),
	perUnitPrice: Yup.number().min(1, 'Price cannot be 0').required('Required'),
});

const Stepper3 = ({
	color,
	size,
	quantity,
	perUnitPrice,
	category,
	setData,
	handleBack,
}) => {
	const formik = useFormik({
		initialValues: {
			color,
			size,
			quantity,
			perUnitPrice,
			category,
		},
		validationSchema: schema,
		onSubmit: (values) => {
			setData((data) => ({
				...data,
				color: values.color,
				size: values.size,
				quantity: values.quantity,
				perUnitPrice: values.perUnitPrice,
				category: values.category,
				activeStep: data.activeStep + 1,
			}));
		},
	});

	return (
		<div className={styles.stepper3}>
			<form onSubmit={formik.handleSubmit}>
				<div className='input_floating_label'>
					<input
						name='category'
						type='string'
						autoComplete='off'
						className='input'
						value={formik.values.category}
						onChange={formik.handleChange}
					/>
					<label htmlFor='category'>Product Category</label>
					<span name='category' className='alert_text'>
						{formik.errors.category}
					</span>
				</div>

				<div className={styles.two_inputs}>
					<div className='input_floating_label'>
						<input
							name='perUnitPrice'
							type='number'
							autoComplete='off'
							className='input'
							value={formik.values.perUnitPrice}
							onChange={formik.handleChange}
						/>
						<label htmlFor='perUnitPrice'>Per Unit Price in &#8377;</label>
						<span name='perUnitPrice' className='alert_text'>
							{formik.errors.perUnitPrice}
						</span>
					</div>

					<div className='input_floating_label'>
						<input
							name='quantity'
							type='number'
							autoComplete='off'
							className='input'
							value={formik.values.quantity}
							onChange={formik.handleChange}
						/>
						<label htmlFor='quantity'>Quantity Available</label>
						<span name='quantity' className='alert_text'>
							{formik.errors.quantity}
						</span>
					</div>
				</div>

				<div className='input_floating_label'>
					<input
						name='color'
						type='string'
						autoComplete='off'
						className='input'
						value={formik.values.color}
						onChange={formik.handleChange}
					/>
					<label htmlFor='color'>Color Variants (Comma Separated)</label>
				</div>

				<div className='input_floating_label'>
					<input
						name='size'
						type='string'
						autoComplete='off'
						className='input'
						value={formik.values.size}
						onChange={formik.handleChange}
					/>
					<label htmlFor='size'>Available Sizes (Comma Separated)</label>
				</div>

				<div className={styles.product_controls}>
					<button
						className='button button_outlined'
						onClick={() => handleBack()}
					>
						Back
					</button>
					<button type='submit' className='button button_outlined'>
						Add
					</button>
				</div>
			</form>
		</div>
	);
};

export default Stepper3;

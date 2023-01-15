import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { addProduct, editProduct } from 'store/productSlice.js';
import dynamic from 'next/dynamic';
import styles from 'styles/add_product.module.scss';
import Stepper1 from './Stepper1';
import Stepper3 from './Stepper3';

const TextEditor = dynamic(
	() => import('components/TextEditor/TextEditor.jsx'),
	{
		ssr: false,
	}
);

const steps = ['Product Name and Image', 'Description', 'Extra Details'];

const AddProductComponent = ({
	title = '',
	image = null,
	perUnitPrice = 1,
	category = '',
	quantity = 1,
	size = '',
	color = '',
	validProduct = true,
	editMode = false,
	_id = '0',
}) => {
	const router = useRouter();
	const dispatch = useDispatch();

	const [textData, setTextData] = useState('');
	const [data, setData] = useState({
		title,
		image,
		perUnitPrice,
		category,
		quantity,
		size,
		color,
		activeStep: 0,
	});

	const handlePublish = useCallback(async () => {
		const toastID = toast.loading(
			`${editMode ? 'Editing' : 'Adding'} your prouct`
		);

		let res = null;
		if (editMode) {
			const { type } = await dispatch(
				editProduct({ ...data, description: textData, _id })
			);
			res = type;
		} else {
			const { type } = await dispatch(
				addProduct({ ...data, description: textData })
			);
			res = type;
		}

		if (
			res === `product/${editMode ? 'editProduct' : 'addProduct'}/fulfilled`
		) {
			router.push('/');
		} else {
			toast.update(toastID, {
				render: `Could not ${editMode ? 'edit' : 'add'} your product`,
				type: 'error',
				hideProgressBar: true,
				isLoading: false,
				autoClose: 3000,
			});
			setData({
				...data,
				activeStep: 0,
			});
		}
	}, [data, dispatch, router, editMode, textData, _id]);

	const handleBack = () => {
		setData((prev) => ({ ...data, activeStep: prev.activeStep - 1 }));
	};

	useEffect(() => {
		if (data.activeStep === 3) handlePublish();
	}, [data, handlePublish]);

	if (!validProduct) {
		return (
			<div className='min_container_height'>
				<h1 className='error_align_center'>No such product</h1>
			</div>
		);
	}

	return (
		<div className={`${styles.add_product_container} min_container_height`}>
			<div className={styles.product_heading}>
				<h1> {editMode ? 'Edit' : 'Add New '} Product</h1>
			</div>
			<Stepper
				activeStep={data.activeStep}
				sx={{
					margin: '2em 0',
				}}
			>
				{steps.map((label) => {
					return (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					);
				})}
			</Stepper>
			{data.activeStep === 0 && (
				<Stepper1 title={data.title} setData={setData} image={data.image} />
			)}
			{data.activeStep === 1 && (
				<div className={styles.product_editor}>
					<p>Description</p>
					<TextEditor textData={textData} setTextData={setTextData} />
					<div className={styles.product_controls}>
						<button
							className='button button_outlined'
							onClick={() => handleBack()}
						>
							Back
						</button>
						<button
							className='button button_outlined'
							onClick={() =>
								setData((prev) => ({
									...data,
									activeStep: prev.activeStep + 1,
								}))
							}
						>
							Next
						</button>
					</div>
				</div>
			)}
			{data.activeStep === 2 && (
				<Stepper3
					handleBack={handleBack}
					color={data.color}
					size={data.size}
					quantity={data.quantity}
					perUnitPrice={data.perUnitPrice}
					category={data.category}
					setData={setData}
				/>
			)}
			<ToastContainer />
		</div>
	);
};

export default AddProductComponent;

/**
 * @description extra stuff
 * (only for classes)
 * (functional components dont have callback for that use useEffect)
 * 1. state updates are asynchronous.
 * 2. cannot use async await with states as they dont return a promise.
 * 3. To solve this state update, takes an optional callback which runs after the update happens
 */

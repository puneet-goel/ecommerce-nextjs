import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { createToken as payloadHeader, toBase64 } from 'utility/client.js';

export const fetchProducts = createAsyncThunk(
	'product/fetchProducts',
	async () => {
		const {
			data: { data },
		} = await axios.get('/api/product');

		return data;
	}
);

export const editProduct = createAsyncThunk(
	'product/editProduct',
	async (editedProduct) => {
		const base64 = await toBase64(editedProduct.image);

		const product = {
			...editedProduct,
			fileData: {
				base64,
				fileName: editedProduct.image.name,
			},
		};

		const {
			data: { data },
		} = await axios.patch('/api/product', product, payloadHeader());

		return data;
	}
);

export const addProduct = createAsyncThunk(
	'product/addProduct',
	async (newProduct) => {
		const base64 = await toBase64(newProduct.image);

		const product = {
			...newProduct,
			fileData: {
				base64,
				fileName: newProduct.image.name,
			},
		};

		const {
			data: { data },
		} = await axios.post('/api/product', product, payloadHeader());

		return data;
	}
);

// export const updateView = createAsyncThunk(
// 	'product/updateView',
// 	async (productId) => {
// 		const {
// 			data: { data },
// 		} = await axios.patch(
// 			'/api/product/updateView/',
// 			{
// 				productId: productId,
// 			},
// 			payloadHeader
// 		);

// 		return data;
// 	}
// );

// export const updateVote = createAsyncThunk(
// 	'product/updateVote',
// 	async (voteData) => {
// 		const {
// 			data: { data },
// 		} = await axios.patch('/api/product/updateVote/', voteData, payloadHeader);

// 		return data;
// 	}
// );

const initialState = {
	products: [],
};

const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		// fetchAllProducts: (state, action) => {
		// 	state.products = action.payload;
		// },
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.products = action.payload;
			})
			.addCase(editProduct.fulfilled, (state, action) => {
				state.products.forEach((cur, idx) => {
					if (cur._id === action.payload._id) {
						state.products[idx] = action.payload;
					}
				});
			})
			.addCase(addProduct.fulfilled, (state, action) => {
				state.products.push(action.payload);
			});
		// .addCase(updateView.fulfilled, (state, action) => {
		// 	state.products.forEach((cur, idx) => {
		// 		if (cur._id === action.payload._id) {
		// 			state.products[idx] = action.payload;
		// 		}
		// 	});
		// })
		// .addCase(updateVote.fulfilled, (state, action) => {
		// 	state.products.forEach((cur, idx) => {
		// 		if (cur._id === action.payload._id) {
		// 			state.products[idx] = action.payload;
		// 		}
		// 	});
		// });
	},
});

// export const { fetchAllProducts } = productSlice.actions;
export default productSlice.reducer;

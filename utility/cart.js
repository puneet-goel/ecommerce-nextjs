/**
 * @type class
 * @description defines cart utility
 * @method getCart
 * @method addItemToCart
 * @method getCartItem
 * @method removeCartItem
 * @method removeAll
 * @method updateCartItem
 */

class Cart {
	constructor() {
		this.cart = [];

		if (typeof window === 'undefined') return;

		const temp = localStorage.getItem('cart');
		if (!temp) {
			localStorage.setItem('cart', '[]');
		} else {
			this.cart = JSON.parse(temp);
		}
	}

	getCart = () => {
		return this.cart;
	};

	addItemToCart = ({ _id, product_name, quantity, price, image }) => {
		if (quantity <= 0) return this.cart;

		this.cart.push({
			_id,
			product_name,
			quantity,
			price,
			image,
		});

		localStorage.setItem('cart', JSON.stringify(this.cart));
		return this.cart;
	};

	getCartItem = ({ _id }) => {
		const exists = this.cart.find((item) => item._id === _id);
		return exists;
	};

	removeCartItem = ({ _id }) => {
		this.cart = this.cart.filter((item) => item._id !== _id);

		localStorage.setItem('cart', JSON.stringify(this.cart));
		return this.cart;
	};

	removeAll = () => {
		this.cart = [];
		localStorage.setItem('cart', '[]');
	};

	updateCartItem = ({ _id, product_name, quantity, price, image }) => {
		if (quantity <= 0) return this.removeCartItem({ _id });

		const exists = this.getCartItem({ _id });
		if (!exists)
			return this.addItemToCart({ _id, product_name, quantity, price, image });

		this.cart = this.cart.map((item) => {
			if (item._id === _id) {
				return { _id, product_name, quantity, price, image };
			}
			return item;
		});

		localStorage.setItem('cart', JSON.stringify(this.cart));
		return this.cart;
	};
}

const cart = new Cart();
export default cart;

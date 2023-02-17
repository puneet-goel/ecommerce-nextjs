import Image from 'next/image';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import styles from 'styles/about.module.scss';
import Link from 'next/link';
import users from 'public/about/users.png';
import products from 'public/about/product.png';
import orders from 'public/about/orders.png';
import category from 'public/about/category.png';
import founder from 'public/about/profile.jpeg';

const AboutComponent = ({ data }) => {
	return (
		<div className={styles.about_section}>
			<h1> Emart </h1>
			<h3>{data.quotation}</h3>

			<div className={styles.about_content}>
				<h2>About Us</h2>
				<p>{data.about}</p>
			</div>

			<div className={styles.about_cards}>
				<h2>Our Impact</h2>
				<div className={`${styles.about_card} elevation`}>
					<Image alt='users' width='100' height='100' src={users} />
					<div className={styles.card_content}>
						<p>Total Users:</p>
						<p>{data.users}+</p>
					</div>
				</div>
				<div
					className={`${styles.about_card} ${styles.reverse_card} elevation`}
				>
					<Image alt='products' width='100' height='100' src={products} />
					<div className={styles.card_content}>
						<p>Total Products:</p>
						<p>{data.products}+</p>
					</div>
				</div>
				<div className={`${styles.about_card} elevation`}>
					<Image alt='orders' width='100' height='100' src={orders} />
					<div className={styles.card_content}>
						<p>Total Orders Placed:</p>
						<p>{data.orders}+</p>
					</div>
				</div>
				<div
					className={`${styles.about_card} ${styles.reverse_card} elevation`}
				>
					<Image alt='categories' width='100' height='100' src={category} />
					<div className={styles.card_content}>
						<p>Total Categories:</p>
						<p>{data.categories}+</p>
					</div>
				</div>
			</div>

			<div className={styles.about_leader}>
				<h2>Our Team</h2>
				<div className={`${styles.leader_card} elevation`}>
					<Image
						alt='founder'
						width='270'
						height='250'
						src={founder}
						placeholder='blur'
					/>
					<div className={styles.card_content}>
						<p>Puneet Goel</p>
						<p>Founder</p>
					</div>

					<div className={styles.card_icons}>
						<Link href='https://github.com/puneet-goel' legacyBehavior>
							<a target='_blank' rel='noopener noreferrer'>
								<GitHubIcon fontSize='large' />
							</a>
						</Link>
						<Link href='https://www.linkedin.com/in/gl-puneet/' legacyBehavior>
							<a target='_blank' rel='noopener noreferrer'>
								<LinkedInIcon fontSize='large' />
							</a>
						</Link>
						<Link href='mailto:puneetgoel016@gmail.com'>
							<EmailIcon fontSize='large' />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutComponent;

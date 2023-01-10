const About = () => {
	return <p>About</p>;
};

export default About;

export async function getStaticProps() {
	try {
		return {
			props: {},
		};
	} catch (err) {
		return {
			props: {},
		};
	}
}

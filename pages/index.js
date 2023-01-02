import React, { useState } from 'react';
import HomeComponent from '../components/Home';
import Navbar from '../components/Navbar/Navbar';

export default function Home() {
	const [searchText, setSearchText] = useState('');

	return (
		<>
			<Navbar searchText={searchText} setSearchText={setSearchText} />
			<HomeComponent searchText={searchText} />
		</>
	);
}


import { Container } from '@mui/material';
import React from 'react';
import MyTable from './components/MyTable';
export function Home() {
	return (
		<Container>
			<h1>My Amazing Favourite American Sports App</h1>
			<MyTable />
		</Container>
	);
}

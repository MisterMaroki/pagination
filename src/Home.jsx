import { Container } from '@mui/material';
import React from 'react';
import MyTable from './components/MyTable';
import MyPieChart from './components/PieChart';
export function Home() {
	return (
		<Container>
			<h1>My Amazing Favourite American Sports App</h1>
			<MyTable />
			<div className="charts-wrapper">
				<div className="chart-container">
					<MyPieChart quantifier={'isEnabled'} title={'Enabled'} />
				</div>
				<div className="chart-container">
					<MyPieChart quantifier={'isValid'} title={'Valid'} />
				</div>
				<div className="chart-container">
					<MyPieChart quantifier={'isAuthorised'} title={'Authorised'} />
				</div>
				<div className="chart-container">
					<MyPieChart quantifier={'isPalindrome'} title={'Palindromes'} />
				</div>
			</div>
		</Container>
	);
}

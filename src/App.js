import { Home } from './Home';
import { Routes, Route, Link } from 'react-router-dom';

import { Container } from '@mui/material';
import './App.css';
import MyTable from './components/MyTable';
import { UserState } from './UserContext';
import Person from './components/Person';

function App() {
	const { userId } = UserState();

	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/person" element={<Person />} />
			</Routes>
		</div>
	);
}

export default App;

import { Home } from './Home';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Person from './components/Person';
import AuthAlert from './components/AuthAlert';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/person" element={<Person />} />
			</Routes>
			<AuthAlert />
		</div>
	);
}

export default App;

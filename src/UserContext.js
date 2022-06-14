import React, { createContext, useContext, useEffect, useState } from 'react';

const User = createContext();

const UserContext = ({ children }) => {
	const [userId, setUserId] = useState(localStorage.getItem('user') || null);
	const [people, setPeople] = React.useState([]);

	useEffect(() => {
		localStorage.setItem('user', userId);
	}, [userId]);

	useEffect(() => {
		const getData = async () => {
			const res = await fetch(
				'https://run.mocky.io/v3/ceb09528-8228-4a95-b7d9-c1f945023c92'
			);
			const data = await res.json();
			setPeople(data);
		};

		return () => getData();
	}, []);

	return (
		<User.Provider value={{ userId, setUserId, people, setPeople }}>
			{children}
		</User.Provider>
	);
};
export default UserContext;

export const UserState = () => useContext(User);

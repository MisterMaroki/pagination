import React, { createContext, useContext, useEffect, useState } from 'react';

const User = createContext();

const UserContext = ({ children }) => {
	const [userId, setUserId] = useState(localStorage.getItem('user') || null);
	const [people, setPeople] = React.useState(
		JSON.parse(localStorage.getItem('people')) || []
	);
	console.log(
		'🚀 ~ file: UserContext.js ~ line 10 ~ UserContext ~ people',
		people
	);

	useEffect(() => {
		localStorage.setItem('user', userId);
		localStorage.setItem('people', JSON.stringify(people));
	}, [userId, people]);

	useEffect(() => {
		const getData = async () => {
			try {
				const res = await fetch(
					'https://run.mocky.io/v3/ceb09528-8228-4a95-b7d9-c1f945023c92'
				);
				const data = await res.json();
				people === [] && setPeople(data);
			} catch (e) {
				console.log(e);
			}
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

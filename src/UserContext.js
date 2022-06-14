import React, { createContext, useContext, useEffect, useState } from 'react';
import { palindrome } from './utils/palindrome';

const User = createContext();

const UserContext = ({ children }) => {
	const [userId, setUserId] = useState(localStorage.getItem('user') || null);
	const [people, setPeople] = React.useState(
		JSON.parse(localStorage.getItem('people')) || []
	);

	const [alert, setAlert] = useState({
		open: false,
		message: '',
		type: 'success',
	});

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
	}, [people]);

	//check for palindromes in updating names.
	//this function could be unneccessary given the computing time it uses.
	//moved this out of an effect into the saveData function in /components/person

	// useEffect(() => {
	// 	setPeople((prev) =>
	// 		prev.map((x) => ({
	// 			...x,
	// 			isPalindrome: palindrome(`${x.firstName} ${x.lastName}`),
	// 		}))
	// 	);
	// }, [people]);

	return (
		<User.Provider
			value={{ userId, setUserId, people, setPeople, alert, setAlert }}
		>
			{children}
		</User.Provider>
	);
};
export default UserContext;

export const UserState = () => useContext(User);

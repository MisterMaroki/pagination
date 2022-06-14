import {
	Box,
	Button,
	Checkbox,
	Container,
	FormControlLabel,
	FormGroup,
	Switch,
	TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { palindrome } from '../utils/palindrome';
import { UserState } from '../UserContext';
import { textFieldSx } from './MyTable';

const Person = () => {
	const { people, userId, setPeople, setAlert } = UserState();
	const [inputData, setInputData] = useState(() => people[userId - 1]);

	const navigate = useNavigate();
	const backHome = (e) => {
		navigate('/');
	};

	//NOTE! I have commented out this sideEffect as the api will only provide data for the first user. In order to provide CRUD abilities, I need to use the already fetched data.

	// useEffect(() => {
	// 	const getUserData = async () => {
	// 		const res = await fetch(
	// 			`https://run.mocky.io/v3/45928af0-9bd1-4eb0-a9a1-55845a009e8d/${userId}`
	// 		);
	// 		const data = await res.json();
	// 		setPersonData(data);
	// 	};
	// 	return () => getUserData();
	// }, [userId]);

	//NOTE: this side effect works, but it also causes the 'inputData' to be null on first render, meaning form fields do not render after F5(refresh)

	// useEffect(() => {
	// 	const getUserData = () => {
	// 		const thisPerson = people.find((x) => x.personId === userId);
	// 		setInputData(thisPerson);
	// 	};
	// 	return () => getUserData();
	// }, [userId]);

	const updateInputData = (e, field) => {
		setInputData((prev) => ({
			...prev,
			[field]: e.target.value,
		}));
	};

	const handleSwitch = (e, field) => {
		setInputData((prev) => ({
			...prev,
			[field]: e.target.checked,
		}));
	};

	const handleCheckBox = (e, index) => {
		setInputData((prev) => ({
			...prev,
			favouriteSports: prev.favouriteSports.map((item, i) => {
				return i === index ? { ...item, isEnabled: e.target.checked } : item;
			}),
		}));
	};

	const saveUser = () => {
		setPeople((prev) => {
			return prev.map((x) => {
				return x.personId === userId
					? {
							...inputData,
							isPalindrome: palindrome(
								`${inputData.firstName} ${inputData.lastName}`
							),
					  }
					: { ...x, isPalindrome: palindrome(`${x.firstName} ${x.lastName}`) };
			});
		});
		setAlert({
			open: true,
			message: `Person #${userId} has been updated.`,
			type: 'success',
		});
	};

	return (
		<Container>
			<h1>Update Person #{userId}</h1>
			{inputData && (
				<Box
					display="flex"
					alignItems="center"
					justifyContent="center"
					flexDirection="column"
					gap="2rem"
				>
					<Box display="flex" gap="1rem" sx={boxSx}>
						<h4>First Name</h4>{' '}
						<TextField
							sx={textFieldSx}
							label="First Name"
							value={inputData.firstName}
							onChange={(e) => updateInputData(e, 'firstName')}
						/>
					</Box>
					<Box display="flex" sx={boxSx}>
						<h4>Last Name</h4>{' '}
						<TextField
							sx={textFieldSx}
							label="Last Name"
							value={inputData.lastName}
							onChange={(e) => updateInputData(e, 'lastName')}
						/>
					</Box>
					<Box sx={boxSx} display="flex">
						<h4>Enabled</h4>{' '}
						<Switch
							checked={inputData.isEnabled}
							onChange={(e) => handleSwitch(e, 'isEnabled')}
							color="secondary"
						/>
					</Box>
					<Box sx={boxSx} display="flex">
						<h4>Valid</h4>{' '}
						<Switch
							checked={inputData.isValid}
							onChange={(e) => handleSwitch(e, 'isValid')}
							color="warning"
						/>
					</Box>
					<Box sx={boxSx} display="flex">
						<h4>Authorised</h4>{' '}
						<Switch
							checked={inputData.isAuthorised}
							onChange={(e) => handleSwitch(e, 'isAuthorised')}
							color="primary"
						/>
					</Box>
					<Box sx={boxSx} display="flex">
						<h4>Favourite Sports</h4>{' '}
						<FormGroup>
							{inputData.favouriteSports.map((x, i) => (
								<FormControlLabel
									key={i}
									control={
										<Checkbox
											checked={inputData.favouriteSports[i].isEnabled}
											onChange={(e) => handleCheckBox(e, i)}
										/>
									}
									label={x.name}
								/>
							))}
						</FormGroup>
					</Box>
					<Box sx={boxSx} display="flex">
						<Button onClick={backHome} variant="contained" color="warning">
							Back home
						</Button>
						{inputData && (
							<Button onClick={saveUser} variant="contained" color="success">
								Save
							</Button>
						)}
					</Box>
				</Box>
			)}
		</Container>
	);
};

export const boxSx = {
	width: '100%',
	maxWidth: '500px',
	justifyContent: 'space-between',
	alignItems: 'center',
	gap: '1rem',
};

export default Person;

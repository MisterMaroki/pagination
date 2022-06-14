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
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserState } from '../UserContext';

const Person = () => {
	const [inputData, setInputData] = useState(null);
	const { people, userId, setPeople } = UserState();
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

	useEffect(() => {
		const getUserData = async () => {
			const thisPerson = people.find((x) => x.personId === userId);

			setInputData(thisPerson);
		};
		return () => getUserData();
	}, [people, userId]);

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
			favouriteSports: prev.favouriteSports.map((item) => {
				console.log('item', item.sportId === index + 1);
				return item.sportId === index + 1
					? { ...item, isEnabled: e.target.checked }
					: item;
			}),
		}));
	};

	const saveNewUser = () => {
		setPeople((prev) => {
			return prev.map((x) => {
				return x.personId === userId ? inputData : x;
			});
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
						<h6>First Name</h6>{' '}
						<TextField
							label="First Name"
							value={inputData.firstName}
							onChange={(e) => updateInputData(e, 'firstName')}
						/>
					</Box>
					<Box display="flex" gap="1rem" sx={boxSx}>
						<h6>Last Name</h6>{' '}
						<TextField
							label="Last Name"
							value={inputData.lastName}
							onChange={(e) => updateInputData(e, 'lastName')}
						/>
					</Box>
					<Box
						sx={boxSx}
						display="flex"
						gap="1rem"
						alignItems={'center'}
						justifyContent="space-between"
					>
						<h6>Enabled</h6>{' '}
						<Switch
							checked={inputData.isEnabled}
							onChange={(e) => handleSwitch(e, 'isEnabled')}
							color="secondary"
						/>
					</Box>
					<Box
						sx={boxSx}
						display="flex"
						gap="1rem"
						alignItems={'center'}
						justifyContent="space-between"
					>
						<h6>Valid</h6>{' '}
						<Switch
							checked={inputData.isValid}
							onChange={(e) => handleSwitch(e, 'isValid')}
							color="secondary"
						/>
					</Box>
					<Box
						sx={boxSx}
						display="flex"
						gap="1rem"
						alignItems={'center'}
						justifyContent="space-between"
					>
						<h6>Authorised</h6>{' '}
						<Switch
							checked={inputData.isAuthorised}
							onChange={(e) => handleSwitch(e, 'isAuthorised')}
							color="secondary"
						/>
					</Box>
					<Box
						sx={boxSx}
						display="flex"
						gap="1rem"
						alignItems={'center'}
						justifyContent="space-between"
					>
						<h6>Favourite Sports</h6>{' '}
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
				</Box>
			)}
			<Button onClick={backHome}>Back home</Button>
			{inputData && <Button onClick={saveNewUser}>Save</Button>}
		</Container>
	);
};

const boxSx = {
	width: '100%',
	maxWidth: '30vw',
	justifyContent: 'space-between',
};

export default Person;

import { Snackbar } from '@mui/material';
import React from 'react';
import Alert from '@mui/material/Alert';
import { UserState } from '../UserContext';

const AuthAlert = () => {
	const { alert, setAlert } = UserState();

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setAlert({ open: false });
	};

	const isSuccesful = alert.type === 'success';

	return (
		<div>
			<Snackbar open={alert.open} autoHideDuration={2000} onClose={handleClose}>
				<Alert
					onClose={handleClose}
					elevation={10}
					variant="filled"
					severity={isSuccesful ? 'success' : 'warning'}
				>
					{alert.message}
				</Alert>
			</Snackbar>
		</div>
	);
};

export default AuthAlert;

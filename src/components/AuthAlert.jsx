import { Close } from '@mui/icons-material';
import { Button, IconButton, Snackbar } from '@mui/material';
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

	return (
		<div>
			<Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
				<Alert
					onClose={handleClose}
					elevation={10}
					variant="filled"
					severity={'success'}
					color="info"
					sx={{ backgroundColor: 'lightgreen !important' }}
				>
					{alert.message}
				</Alert>
			</Snackbar>
		</div>
	);
};

export default AuthAlert;

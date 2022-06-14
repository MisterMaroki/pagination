import { TableHeader } from './TableHeader';
import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { UserState } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import { boxSx } from './Person';
import { TextField } from '@mui/material';

function TablePaginationActions(props) {
	const theme = useTheme();
	const { count, page, rowsPerPage, onPageChange } = props;

	const handleFirstPageButtonClick = (event) => {
		onPageChange(event, 0);
	};

	const handleBackButtonClick = (event) => {
		onPageChange(event, page - 1);
	};

	const handleNextButtonClick = (event) => {
		onPageChange(event, page + 1);
	};

	const handleLastPageButtonClick = (event) => {
		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<Box sx={{ flexShrink: 0, ml: 2.5, alignSelf: 'flex-end' }}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label="first page"
			>
				{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label="previous page"
			>
				{theme.direction === 'rtl' ? (
					<KeyboardArrowRight />
				) : (
					<KeyboardArrowLeft />
				)}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				{theme.direction === 'rtl' ? (
					<KeyboardArrowLeft />
				) : (
					<KeyboardArrowRight />
				)}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="last page"
			>
				{theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</Box>
	);
}

TablePaginationActions.propTypes = {
	count: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
};

const columns = [
	{ id: 'name', label: 'Name', minWidth: 130, align: 'center' },
	{ id: 'enabled', label: 'Enabled', minWidth: 100, align: 'center' },
	{
		id: 'valid',
		label: 'Valid',
		minWidth: 100,
		align: 'center',
	},
	{
		id: 'authorized',
		label: 'Authorized',
		minWidth: 100,
		align: 'center',
	},
	{
		id: 'palindrome',
		label: 'Palindrome',
		minWidth: 100,
		align: 'center',
	},
	{
		id: 'sports',
		label: 'Favourite Sports',
		minWidth: 170,
		align: 'center',
	},
];

// favouriteSports: (3) [{…}, {…}, {…}]
// firstName: "Frank"
// isAuthorised: false
// isEnabled: false
// isPalindrome: false
// isValid: true
// lastName: "Smith"
// personId: 1

function createData(person) {
	const {
		favouriteSports,
		firstName,
		isAuthorised,
		isEnabled,
		isPalindrome,
		isValid,
		lastName,
		personId,
	} = person;
	return {
		favouriteSports,
		firstName,
		isAuthorised,
		isEnabled,
		isPalindrome,
		isValid,
		lastName,
		personId,
	};
}

export default function MyTable() {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(3);
	const [search, setSearch] = React.useState('');

	const { setUserId, people } = UserState();

	const navigate = useNavigate();

	const rows = people
		.filter(
			(x) =>
				x.firstName.toLowerCase().includes(search) ||
				x.lastName.toLowerCase().includes(search)
		)
		.map((x) => createData(x));
	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleRowClick = (id) => {
		setUserId(id);
		navigate('/person');
	};

	return (
		<>
			<Box display="flex" gap="1rem" sx={boxSx}>
				<h6>Search by name</h6>{' '}
				<TextField
					label="Name"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</Box>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
					<TableHeader columns={columns} />
					<TableBody>
						{(rowsPerPage > 0
							? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							: rows
						).map((row) => {
							const {
								favouriteSports,
								firstName,
								isAuthorised,
								isEnabled,
								isPalindrome,
								isValid,
								lastName,
								personId,
							} = row;
							let sports = favouriteSports.map((x) => x.name).join(', ');

							return (
								<TableRow
									key={firstName}
									onClick={() => handleRowClick(personId)}
									sx={{
										cursor: 'pointer',
										'&:hover': { backgroundColor: 'whitesmoke' },
									}}
								>
									<TableCell style={{ width: 150 }} component="th" scope="row">
										{firstName.toString() + ' ' + lastName.toString()}
									</TableCell>
									<TableCell style={{ width: 100 }} align="center">
										{isEnabled.toString()}
									</TableCell>
									<TableCell style={{ width: 100 }} align="center">
										{isValid.toString()}
									</TableCell>
									<TableCell style={{ width: 160 }} align="center">
										{isAuthorised.toString()}
									</TableCell>
									<TableCell style={{ width: 160 }} align="center">
										{isPalindrome.toString()}
									</TableCell>
									<TableCell style={{ width: 160 }}>{sports}</TableCell>
								</TableRow>
							);
						})}

						{emptyRows > 0 && (
							<TableRow style={{ height: 53 * emptyRows }}>
								<TableCell colSpan={6} />
							</TableRow>
						)}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TablePagination
								rowsPerPageOptions={[3, 10, 25, { label: 'All', value: -1 }]}
								colSpan={3}
								count={rows.length}
								rowsPerPage={rowsPerPage}
								page={page}
								SelectProps={{
									inputProps: {
										'aria-label': 'rows per page',
									},
									native: true,
								}}
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangeRowsPerPage}
								ActionsComponent={TablePaginationActions}
							/>
						</TableRow>
					</TableFooter>
				</Table>
			</TableContainer>
		</>
	);
}

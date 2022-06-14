import { TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';
export function TableHeader({ columns }) {
	return (
		<TableHead>
			<TableRow>
				{columns.map((column) => {
					return (
						<TableCell
							key={column.id}
							align={column.align}
							style={{
								minWidth: column.minWidth,
							}}
						>
							{column.label}
						</TableCell>
					);
				})}
			</TableRow>
		</TableHead>
	);
}

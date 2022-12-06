import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import DataTableRow from "./DataTableRow";

const DataTable = ({data}) => {
  return (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple_table">
            <TableHead>
                <TableRow>
                    <TableCell>Time</TableCell>
                    <TableCell align="right">Income / Expense</TableCell>
                    <TableCell align="right">Money</TableCell>
                    <TableCell align="right">Category</TableCell>
                    <TableCell align="right">Description</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    data.map((singleData) => {
                    return(
                        <DataTableRow singleData={singleData} isIncome={singleData.isIncome}/>
                    )})
                }
            </TableBody>
        </Table>
    </TableContainer>
);
}

export default DataTable;
import { TableRow, TableCell } from "@material-ui/core";

const DataTableRow = ({singleData, isIncome, index}) => {
    const type = isIncome ? "income" : "expense";
    return (
        <TableRow
            key={type + '_' + index}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {singleData.time}
            </TableCell>
            <TableCell align="right" >{singleData.isIncome?"Income":"Expense"}</TableCell>
            <TableCell align="right" >{singleData.money}</TableCell>
            <TableCell align="right" >{singleData.category || "no category"}</TableCell>
            <TableCell align="right" >{singleData.description || "no description"}</TableCell>
        </TableRow>
    )
}

export default DataTableRow;
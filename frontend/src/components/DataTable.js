import { useState } from "react";
import { useMutation } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "../css/DataTable.css"

import {
  CREATE_ITEM_MUTATION,
  UPDATE_ITEM_MUTATION,
  DELETE_ITEM_MUTATION,
} from "../graphql";

import Row from "./Row";
import { useAccount } from "../containers/hooks/useAccount";
import UpdateAccountModal from "../containers/UpdateAccountModal";
import { Button } from "@material-ui/core";


function DataTable({ title, data }) {
  const { setAlertData } = useAccount();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);

  const [createItem] = useMutation(CREATE_ITEM_MUTATION);
  const [updateItem] = useMutation(UPDATE_ITEM_MUTATION);
  const [deleteItem] = useMutation(DELETE_ITEM_MUTATION);

  const sortedData = data.slice().sort((a, b) => b.time - a.time);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    console.log("in handleModalClose");
    setModalOpen(false);
  };

  const handleNewDataCreated = (data) => {
    console.log("in handleNewDataCreated");
    createItem({
      variables: {
        input: {
          id: uuidv4(),
          ...data,
        },
      },
    });
    setAlertData("New data created successfully!", "success");
  };

  return (
    <Paper className="p-4" sx={{
      bgcolor:"rgb(225, 253, 253)"
    }} >
      {title?<Typography
        align="center"
        component="h2"
        variant="h5"
        color="primary"
        gutterBottom
      >
        {title}
      </Typography>:null}
      
      <Table size="small" >
        <TableHead>
          <TableRow>
            <TableCell variant="head">Date</TableCell>
            <TableCell variant="head">Name</TableCell>
            <TableCell variant="head" align="right">
              Amount
            </TableCell>
            <TableCell variant="head">Category</TableCell>
            <TableCell variant="head" />
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item) => (
              <Row
                key={item.id}
                item={item}
                updateItem={updateItem}
                deleteItem={deleteItem}
              />
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={1}>
              <Button onClick={handleModalOpen}>
                <AddCircleOutlineIcon onClick={handleModalOpen} />
              </Button>
              <UpdateAccountModal
                open={modalOpen}
                handleModalClose={handleModalClose}
                onSubmitEdit={handleNewDataCreated}
                data={{}}
                title="Create New Data"
              />
            </TableCell>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Paper>
  );
}

export default DataTable;

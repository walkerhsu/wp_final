import { useState } from "react";
import PropTypes from "prop-types";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import UpdateAccountModal from "../containers/UpdateAccountModal";
import ResetDataModal from "../containers/ResetDataModal";

function Row({ item }) {
  console.log(item);
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const onCollapse = () => {
    setDescriptionOpen((open) => !open);
  };

  const onEdit = () => {
    setEditOpen((open) => !open);
  };

  const onDelete = () => {
    setDeleteOpen(true);
  };

  return (
    <>
      <TableRow data-cy="item" key={item.id} hover>
        <TableCell onClick={onCollapse} sx={{ cursor: "pointer" }}>
          <Typography>{item.time}</Typography>
        </TableCell>
        <TableCell
          data-cy="item-name"
          onClick={onCollapse}
          sx={{ cursor: "pointer" }}
        >
          <Typography>{item.name}</Typography>
        </TableCell>
        <TableCell onClick={onCollapse} data-cy="item-money" align="right">
          <Typography>{item.money && `$${item.money}`}</Typography>
        </TableCell>
        <TableCell
          data-cy="item-category"
          onClick={onCollapse}
          sx={{ cursor: "pointer" }}
        >
          <Typography>{item.category?.toLowerCase()}</Typography>
        </TableCell>
        <TableCell align="right" data-cy="item-edit">
          <IconButton onClick={onEdit} data-cy="update-item">
            <EditIcon />
          </IconButton>
          <div>
            <IconButton onClick={onDelete} data-cy="delete-item">
              <DeleteIcon />
            </IconButton>
            <ResetDataModal
              open={deleteOpen}
              handleModalClose={() => setDeleteOpen(false)}
              data={item}
            />
          </div>
        </TableCell>
      </TableRow>
      <TableRow key={`${item.id}-descriptions`}>
        <TableCell colSpan={5} style={{ paddingTop: 0, paddingBottom: 0 }}>
          <Collapse in={descriptionOpen} timeout="auto" unmountOnExit>
            <div className="p-4">
              <Typography gutterBottom>Descriptions</Typography>
              <Typography variant="subtitle2" sx={{ textIndent: "1rem" }}>
                {item.description || "No description..."}
              </Typography>
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
      <UpdateAccountModal
        // title="Edit Item"
        open={editOpen}
        handleModalClose={() => setEditOpen(false)}
        data={item}
        // onSubmit={handleSubmitEdit}
        // defaultFormData={item}
      />
    </>
  );
}

export default Row;

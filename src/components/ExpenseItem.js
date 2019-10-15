import React from "react";
import {
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";

const ExpenseItem = ({ expense, deleteItem, editItem }) => {
  const { id, charge, amount } = expense;
  return (
    <>
      <ListItem>
        <ListItemText primary={charge} secondary={"$" + amount} />
        <ListItemSecondaryAction>
          <IconButton onClick={() => editItem(id)}  edge="end" aria-label="Edit">
            <Edit />
          </IconButton>
          <IconButton onClick={() => deleteItem(id)}  edge="end" aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </>
  );
};

export default ExpenseItem;

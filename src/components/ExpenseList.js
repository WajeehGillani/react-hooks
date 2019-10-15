import React from "react";
import Item from "./ExpenseItem";
import { List, Button, Icon } from "@material-ui/core";
const ExpenseList = ({ expenses, deleteItem, editItem, clearItems }) => {
  return (
    <>
      <List>
        {expenses.map(expense => {
          return (
            <Item
              expense={expense}
              key={expense.id}
              deleteItem={deleteItem}
              editItem={editItem}
            />
          );
        })}
      </List>
      {expenses.length > 0 && (
        <Button
          variant="contained"
          margin="normal"
          color="primary"
          endIcon={<Icon>delete</Icon>}
          onClick={clearItems}
        >
          Clear Expense
        </Button>
      )}
    </>
  );
};

export default ExpenseList;

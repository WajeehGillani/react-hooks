import React from "react";
import {
  TextField,
  Button,
  Icon,
  FormControl,
  FormGroup
} from "@material-ui/core";

const ExpenseForm = ({
  charge,
  amount,
  handleCharge,
  handleAmount,
  handleSubmit,
  edit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormGroup>
          <TextField
            typ="text"
            name="charge"
            label="Charge"
            margin="normal"
            value={charge}
            onChange={handleCharge}
          />

          <TextField
            typ="number"
            name="amount"
            label="Amount e.g. 1500"
            margin="normal"
            value={amount}
            onChange={handleAmount}
          />
        </FormGroup>
        <FormGroup row>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<Icon>send</Icon>}
          >
            {edit ? "Edit" : "Submit"}
          </Button>
        </FormGroup>
      </FormControl>
    </form>
  );
};

export default ExpenseForm;

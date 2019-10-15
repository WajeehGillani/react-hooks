import React, { useState, useEffect } from "react";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import uuid from "uuid/v4";
import {
  Container,
  Typography,
  Card,
  Paper,
  Snackbar
} from "@material-ui/core";

// GetItem from localStorage, if Null returns empty array
const initExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

const App = () => {
  //Set Expenses
  const [expenses, setExpenses] = useState(initExpenses);
  //set Charge
  const [charge, setCharge] = useState("");
  //set Amount
  const [amount, setAmount] = useState("");
  //Set Alert
  const [alert, setAlert] = useState({ open: false });
  //Set Edit Item
  const [edit, setEdit] = useState(false);
  //Set Item Id
  const [id, setId] = useState(0);

  //Set Item on submitting form in local Storage
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  });

  //HandleAlert
  const handleAlert = ({ type, text }) => {
    setAlert({ open: true, text, type });
    setTimeout(() => {
      setAlert({ open: false });
    }, 5000);
  };

  //handleCharge
  const handleCharge = e => {
    setCharge(e.target.value);
  };

  //handleAmount
  const handleAmount = e => {
    setAmount(e.target.value);
  };

  //Clear all the expenses
  const clearItems = () => {
    setExpenses([]);
  };

  //Delete Single Item
  const deleteItem = id => {
    let tempExp = expenses.filter(item => item.id !== id);
    setExpenses(tempExp);
    handleAlert({ text: "deleted", type: "danger" });
  };

  //Edit  Item
  const editItem = id => {
    let expense = expenses.find(item => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };

  //handleSubmit
  const handleSubmit = e => {
    e.preventDefault();
    //check if fields are not empty
    if (charge !== "" && amount > 0) {
      //check if item isEdit or Not
      if (edit) {
        let tempExpenses = expenses.map(item => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: "success", text: "item Edited" });
      } else {
        const expense = { id: uuid(), charge, amount };
        setExpenses([...expenses, expense]);
        handleAlert({ type: "success", text: "item Added" });
      }
      setCharge("");
      setAmount("");
    } else {
      handleAlert({ type: "danger", text: "Inputs cannot be empty" });
    }
  };

  return (
    <Container maxWidth="sm" align="center">
      <Snackbar
        open={alert.open}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        message={alert.text}
      ></Snackbar>
      {alert.show && <span>{alert.text}</span>}
      <Typography variant="h3" gutterBottom component="h5">
        Budget Calculator
      </Typography>
      <Card raised style={{padding:'10px'}}> 
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          deleteItem={deleteItem}
          editItem={editItem}
          clearItems={clearItems}
        />
      </Card>
      <Paper  style={{margin:'10px', padding:'5px', backgroundColor:'#f6f6f6'}}>
        <Typography variant="h5" component="h5">
          Total:{" "}
          
            $
            {expenses.reduce((acc, curr) => {
              return (acc += parseInt(curr.amount));
            }, 0)}
          
        </Typography>
      </Paper>
    </Container>
  );
};

export default App;

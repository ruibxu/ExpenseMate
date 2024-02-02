import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState,useEffect } from "react";
import ExpenseGraph from "../components/ExpenseGraph";
import ExpenseList from "../components/ExpenseList";
import { ExpensesContext } from "../context/ExpenseReportContext";

const Expenses = () => {
  const { expenses } = React.useContext(ExpensesContext);
  
  useEffect(() => {
    console.log('Expenses:', expenses.date);
  }, [expenses]);

  return (
    <ScrollView style={styles.container}>
      <ExpenseGraph data={expenses} />
      <ExpenseList data={expenses} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#020014",
    height: "100%",
    padding: 21,
  },
});

export default Expenses;

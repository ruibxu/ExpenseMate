import ExpenseGraph from "../components/ExpenseGraph";
import ExpenseList from "../components/ExpenseList";
import React, { useEffect, useState, useContext } from "react";
import {
  ScrollView,
  StyleSheet,
} from "react-native";
import { ExpensesContext } from "../context/ExpenseReportContext";


const Expenses = () => {

  const { expenses } = useContext(ExpensesContext);

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

import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import ExpenseGraph from "../components/ExpenseGraph";
import ExpenseList from "../components/ExpenseList";

const Expenses = () => {
  const [expenses, setExpenses] = useState([
    { amount: 100, date: "2024-01-04" },
    { amount: 60, date: "2024-01-12" },
    { amount: 45.75, date: "2024-01-07" },
    { amount: 30.8, date: "2024-01-18" },
    { amount: 55.2, date: "2024-01-20" },
    { amount: 22, date: "2024-01-23" },
    { amount: 22, date: "2024-04-23" },
    { amount: 37.25, date: "2024-01-26" },
    { amount: 60.9, date: "2024-01-28" },
    { amount: 19.99, date: "2024-01-31" },
    { amount: 45, date: "2024-02-03" },
    { amount: 28.3, date: "2024-02-06" },
    { amount: 12.75, date: "2024-02-09" },
    { amount: 37.8, date: "2024-02-12" },
    { amount: 52.5, date: "2024-02-15" },
    { amount: 23.4, date: "2024-02-18" },
    { amount: 30, date: "2024-02-21" },
    { amount: 14.99, date: "2024-02-24" },
    { amount: 48.75, date: "2024-02-27" },
    { amount: 33.25, date: "2024-03-02" },
    { amount: 40.5, date: "2023-01-10" },
    { amount: 15, date: "2023-02-12" },
    { amount: 20.75, date: "2023-03-15" },
    { amount: 28.8, date: "2023-04-18" },
    { amount: 62.2, date: "2023-05-20" },
    { amount: 18, date: "2023-06-23" },
    { amount: 43.25, date: "2023-07-26" },
    { amount: 50.9, date: "2023-08-28" },
    { amount: 24.99, date: "2023-09-30" },
    { amount: 38, date: "2023-10-03" },
    { amount: 26.3, date: "2023-11-06" },
    { amount: 10.75, date: "2023-12-09" },
    { amount: 35.8, date: "2022-01-12" },
    { amount: 48.5, date: "2022-02-15" },
    { amount: 19.4, date: "2022-03-18" },
    { amount: 26, date: "2022-04-21" },
    { amount: 12.99, date: "2022-05-24" },
    { amount: 55.75, date: "2022-06-27" },
    { amount: 40.25, date: "2022-07-02" },
    { amount: 30.5, date: "2022-08-05" },
    { amount: 30.5, date: "2021-08-05" },
  ]);

  return (
    <ScrollView style={styles.container}>
      <ExpenseGraph data={expenses} />
      <ExpenseList data={expenses}/>
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

import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import ExpenseGraph from "../components/ExpenseGraph";
import ExpenseList from "../components/ExpenseList";

const Expenses = () => {
  const expenses = [
    { id: 1, amount: 100, date: "2024-01-04", category: "food" },
    { id: 2, amount: 60, date: "2024-01-12", category: "others" },
    { id: 3, amount: 45.75, date: "2024-01-07", category: "transport" },
    { id: 4, amount: 30.8, date: "2024-01-18", category: "house" },
    { id: 5, amount: 55.2, date: "2024-01-20", category: "health" },
    { id: 6, amount: 22, date: "2024-01-23", category: "shopping" },
    { id: 7, amount: 22, date: "2024-04-23", category: "others" },
    { id: 8, amount: 37.25, date: "2024-01-26", category: "food" },
    { id: 9, amount: 60.9, date: "2024-01-28", category: "shopping" },
    { id: 10, amount: 19.99, date: "2024-01-31", category: "others" },
    { id: 11, amount: 45, date: "2024-02-03", category: "health" },
    { id: 12, amount: 28.3, date: "2024-02-06", category: "house" },
    { id: 13, amount: 12.75, date: "2024-02-09", category: "transport" },
    { id: 14, amount: 37.8, date: "2024-02-12", category: "food" },
    { id: 15, amount: 52.5, date: "2024-02-15", category: "shopping" },
    { id: 16, amount: 23.4, date: "2024-02-18", category: "others" },
    { id: 17, amount: 30, date: "2024-02-21", category: "health" },
    { id: 18, amount: 14.99, date: "2024-02-24", category: "house" },
    { id: 19, amount: 48.75, date: "2024-02-27", category: "transport" },
    { id: 20, amount: 33.25, date: "2024-03-02", category: "food" },
    { id: 21, amount: 40.5, date: "2023-01-10", category: "shopping" },
    { id: 22, amount: 15, date: "2023-02-12", category: "others" },
    { id: 23, amount: 20.75, date: "2023-03-15", category: "health" },
    { id: 24, amount: 28.8, date: "2023-04-18", category: "house" },
    { id: 25, amount: 62.2, date: "2023-05-20", category: "transport" },
    { id: 26, amount: 18, date: "2023-06-23", category: "food" },
    { id: 27, amount: 43.25, date: "2023-07-26", category: "shopping" },
    { id: 28, amount: 50.9, date: "2023-08-28", category: "others" },
    { id: 29, amount: 24.99, date: "2023-09-30", category: "health" },
    { id: 30, amount: 38, date: "2023-10-03", category: "house" },
    { id: 31, amount: 26.3, date: "2023-11-06", category: "transport" },
    { id: 32, amount: 10.75, date: "2023-12-09", category: "food" },
    { id: 33, amount: 35.8, date: "2022-01-12", category: "shopping" },
    { id: 34, amount: 48.5, date: "2022-02-15", category: "others" },
    { id: 35, amount: 19.4, date: "2022-03-18", category: "health" },
    { id: 36, amount: 26, date: "2022-04-21", category: "house" },
    { id: 37, amount: 12.99, date: "2022-05-24", category: "transport" },
    { id: 38, amount: 55.75, date: "2022-06-27", category: "food" },
    { id: 39, amount: 40.25, date: "2022-07-02", category: "shopping" },
    { id: 40, amount: 30.5, date: "2022-08-05", category: "others" },
    { id: 41, amount: 30.5, date: "2021-08-05", category: "health" },
  ];
  

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

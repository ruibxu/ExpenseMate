import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import ExpenseGraph from "../components/ExpenseGraph";

const Expenses = () => {
  const [expenses, setExpenses] = useState([
    { monto: 100, fecha: "2024-01-04" },
    { monto: 60, fecha: "2024-01-12" },
    { monto: 45.75, fecha: "2024-01-07" },
    { monto: 30.8, fecha: "2024-01-18" },
    { monto: 55.2, fecha: "2024-01-20" },
    { monto: 22, fecha: "2024-01-23" },
    { monto: 22, fecha: "2024-04-23" },
    { monto: 37.25, fecha: "2024-01-26" },
    { monto: 60.9, fecha: "2024-01-28" },
    { monto: 19.99, fecha: "2024-01-31" },
    { monto: 45, fecha: "2024-02-03" },
    { monto: 28.3, fecha: "2024-02-06" },
    { monto: 12.75, fecha: "2024-02-09" },
    { monto: 37.8, fecha: "2024-02-12" },
    { monto: 52.5, fecha: "2024-02-15" },
    { monto: 23.4, fecha: "2024-02-18" },
    { monto: 30, fecha: "2024-02-21" },
    { monto: 14.99, fecha: "2024-02-24" },
    { monto: 48.75, fecha: "2024-02-27" },
    { monto: 33.25, fecha: "2024-03-02" },
    { monto: 40.5, fecha: "2023-01-10" },
    { monto: 15, fecha: "2023-02-12" },
    { monto: 20.75, fecha: "2023-03-15" },
    { monto: 28.8, fecha: "2023-04-18" },
    { monto: 62.2, fecha: "2023-05-20" },
    { monto: 18, fecha: "2023-06-23" },
    { monto: 43.25, fecha: "2023-07-26" },
    { monto: 50.9, fecha: "2023-08-28" },
    { monto: 24.99, fecha: "2023-09-30" },
    { monto: 38, fecha: "2023-10-03" },
    { monto: 26.3, fecha: "2023-11-06" },
    { monto: 10.75, fecha: "2023-12-09" },
    { monto: 35.8, fecha: "2022-01-12" },
    { monto: 48.5, fecha: "2022-02-15" },
    { monto: 19.4, fecha: "2022-03-18" },
    { monto: 26, fecha: "2022-04-21" },
    { monto: 12.99, fecha: "2022-05-24" },
    { monto: 55.75, fecha: "2022-06-27" },
    { monto: 40.25, fecha: "2022-07-02" },
    { monto: 30.5, fecha: "2022-08-05" },
    { monto: 30.5, fecha: "2021-08-05" },
  ]);

  return (
    <View style={styles.container}>
      <ExpenseGraph data={expenses} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#020014",
    height: "100%"
  }
});

export default Expenses;

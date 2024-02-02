import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import ExpenseGraph from "../components/ExpenseGraph";
import ExpenseList from "../components/ExpenseList";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Expenses = () => {
  const expenses = [
    {
      _id: "1",
      amount: 100,
      date: "2024-01-01",
      category: { _id: "1", label: "Food", color: "#ff0000" },
    },
    {
      _id: "2",
      amount: 60,
      date: "2024-01-07",
      category: { _id: "2", label: "Housing", color: "#f74b47" },
    },
    {
      _id: "3",
      amount: 45.75,
      date: "2024-01-14",
      category: { _id: "3", label: "Health", color: "#08fb9a" },
    },
    {
      _id: "4",
      amount: 30.8,
      date: "2024-01-23",
      category: { _id: "4", label: "Transportation", color: "#8657de" },
    },
    {
      _id: "5",
      amount: 55.2,
      date: "2024-01-30",
      category: { _id: "5", label: "Shopping", color: "#19daf8" },
    },
    {
      _id: "6",
      amount: 22,
      date: "2024-01-25",
      category: { _id: "6", label: "Entertainment", color: "#2254b6" },
    },
    {
      _id: "7",
      amount: 22,
      date: "2024-02-01",
      category: { _id: "7", label: "Other", color: "#ffde5d" },
    },
    {
      _id: "8",
      amount: 37.25,
      date: "2024-02-3",
      category: { _id: "1", label: "Food", color: "#ff0000" },
    },
    {
      _id: "9",
      amount: 60.9,
      date: "2024-02-7",
      category: { _id: "5", label: "Shopping", color: "#19daf8" },
    },
    {
      _id: "10",
      amount: 19.99,
      date: "2024-02-14",
      category: { _id: "7", label: "Other", color: "#ffde5d" },
    },
    {
      _id: "11",
      amount: 45,
      date: "2024-02-16",
      category: { _id: "3", label: "Health", color: "#08fb9a" },
    },
    {
      _id: "12",
      amount: 28.3,
      date: "2024-02-22",
      category: { _id: "2", label: "Housing", color: "#f74b47" },
    },
    {
      _id: "13",
      amount: 12.75,
      date: "2024-02-27",
      category: { _id: "4", label: "Transportation", color: "#8657de" },
    },
    {
      _id: "14",
      amount: 37.8,
      date: "2024-02-29",
      category: { _id: "1", label: "Food", color: "#ff0000" },
    },
    {
      _id: "15",
      amount: 52.5,
      date: "2024-03-03",
      category: { _id: "5", label: "Shopping", color: "#19daf8" },
    },
    {
      _id: "16",
      amount: 23.4,
      date: "2024-03-04",
      category: { _id: "7", label: "Other", color: "#ffde5d" },
    },
    {
      _id: "17",
      amount: 30,
      date: "2024-03-02",
      category: { _id: "3", label: "Health", color: "#08fb9a" },
    },
    {
      _id: "18",
      amount: 14.99,
      date: "2024-03-03",
      category: { _id: "2", label: "Housing", color: "#f74b47" },
    },
    {
      _id: "19",
      amount: 48.75,
      date: "2024-03-07",
      category: { _id: "4", label: "Transportation", color: "#8657de" },
    },
    {
      _id: "20",
      amount: 33.25,
      date: "2024-03-08",
      category: { _id: "1", label: "Food", color: "#ff0000" },
    },
    {
      _id: "21",
      amount: 40.5,
      date: "2024-03-09",
      category: { _id: "5", label: "Shopping", color: "#19daf8" },
    },
    {
      _id: "22",
      amount: 15,
      date: "2024-03-10",
      category: { _id: "7", label: "Other", color: "#ffde5d" },
    },
    {
      _id: "23",
      amount: 20.75,
      date: "2024-03-11",
      category: { _id: "3", label: "Health", color: "#08fb9a" },
    },
    {
      _id: "24",
      amount: 28.8,
      date: "2024-03-12",
      category: { _id: "2", label: "Housing", color: "#f74b47" },
    },
    {
      _id: "25",
      amount: 62.2,
      date: "2024-03-13",
      category: { _id: "4", label: "Transportation", color: "#8657de" },
    },
    {
      _id: "26",
      amount: 18,
      date: "2024-03-14",
      category: { _id: "1", label: "Food", color: "#ff0000" },
    },
    {
      _id: "27",
      amount: 43.25,
      date: "2024-03-15",
      category: { _id: "5", label: "Shopping", color: "#19daf8" },
    },
    {
      _id: "28",
      amount: 50.9,
      date: "2024-03-16",
      category: { _id: "7", label: "Other", color: "#ffde5d" },
    },
    {
      _id: "29",
      amount: 24.99,
      date: "2024-03-17",
      category: { _id: "3", label: "Health", color: "#08fb9a" },
    },
    {
      _id: "30",
      amount: 38,
      date: "2024-03-18",
      category: { _id: "2", label: "Housing", color: "#f74b47" },
    },
    {
      _id: "31",
      amount: 26.3,
      date: "2024-01-19",
      category: { _id: "4", label: "Transportation", color: "#8657de" },
    },
    {
      _id: "32",
      amount: 10.75,
      date: "2024-01-20",
      category: { _id: "1", label: "Food", color: "#ff0000" },
    },
    {
      _id: "33",
      amount: 35.8,
      date: "2024-01-21",
      category: { _id: "5", label: "Shopping", color: "#19daf8" },
    },
    {
      _id: "34",
      amount: 48.5,
      date: "2024-01-22",
      category: { _id: "7", label: "Other", color: "#ffde5d" },
    },
    {
      _id: "35",
      amount: 19.4,
      date: "2024-01-23",
      category: { _id: "3", label: "Health", color: "#08fb9a" },
    },
    {
      _id: "36",
      amount: 26,
      date: "2024-03-24",
      category: { _id: "2", label: "Housing", color: "#f74b47" },
    },
    {
      _id: "37",
      amount: 12.99,
      date: "2024-03-25",
      category: { _id: "4", label: "Transportation", color: "#8657de" },
    },
    {
      _id: "38",
      amount: 55.75,
      date: "2024-03-26",
      category: { _id: "1", label: "Food", color: "#ff0000" },
    },
    {
      _id: "39",
      amount: 40.25,
      date: "2024-03-27",
      category: { _id: "5", label: "Shopping", color: "#19daf8" },
    },
    {
      _id: "40",
      amount: 30.5,
      date: "2024-03-28",
      category: { _id: "7", label: "Other", color: "#ffde5d" },
    },
    {
      _id: "41",
      amount: 30.5,
      date: "2024-03-29",
      category: { _id: "3", label: "Health", color: "#08fb9a" },
    },
  ];

  const getStoredExpenses = async () => {
    try {
      const storedExpenses = await AsyncStorage.getItem("expenses");
      return storedExpenses ? JSON.parse(storedExpenses) : [];
    } catch (error) {
      console.error("Error al obtener datos del AsyncStorage:", error);
      return [];
    }
  };

  const loadExpensesFromStorage = async () => {
    try {
      const storedExpenses = await getStoredExpenses();

      expenses.push(...storedExpenses);

      console.log(expenses);
    } catch (error) {
      console.error("Error al cargar datos desde AsyncStorage:", error);
    }
  };

  loadExpensesFromStorage();

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

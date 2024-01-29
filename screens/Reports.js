import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ListItem from "../components/ListItem";
import { theme } from "../theme";

const { width } = Dimensions.get("window");

const ReportScreen = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Function to retrieve expenses data from local storage
    const fetchExpenses = async () => {
      try {
        // Fetch expenses data from local storage (implement your own logic)
        const expensesData = await AsyncStorage.getItem("expenses");
        if (expensesData) {
          const parsedExpenses = JSON.parse(expensesData);
          setExpenses(parsedExpenses);
        }
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  // Function to prepare data for the doughnut chart
  const prepareChartData = () => {
    const categoryData = {};

    // Aggregate expenses data by category and calculate total amount spent
    expenses.forEach((expense) => {
      const { category, amount } = expense;
      if (category && category.label) {
        // Check if category and label are defined
        if (categoryData[category.label]) {
          categoryData[category.label].value += amount;
        } else {
          categoryData[category.label] = {
            value: amount,
            color: category.color,
            legendFontColor: "#7F7F7F",
            legendFontSize: 15,
          };
        }
      }
    });

    // Convert aggregated data to format suitable for pie chart
    const doughnutChartData = Object.keys(categoryData).map((label) => ({
      name: label,
      value: categoryData[label].value,
      color: categoryData[label].color,
      legendFontColor: categoryData[label].legendFontColor,
      legendFontSize: categoryData[label].legendFontSize,
    }));

    return doughnutChartData;
  };

  // Function to calculate total expenses and percentages by category
  const calculateCategorySummary = () => {
    const categorySummary = {};
    let totalExpense = 0;

    // Calculate total expenses and expenses per category
    expenses.forEach((expense) => {
      const { category, amount } = expense;
      console.log(expense);
      if (category && category.label) {
        totalExpense += amount;
        if (categorySummary[category.label]) {
          categorySummary[category.label].value += amount;
        } else {
          categorySummary[category.label] = {
            value: amount,
            color: category.color,
            date: expense.date,
          };
        }
      }
    });

    // Calculate percentage and add it to each category summary
    Object.keys(categorySummary).forEach((category) => {
      categorySummary[category].percentage =
        (categorySummary[category].value / totalExpense) * 100;
    });

    return categorySummary;
  };

  const categorySummary = calculateCategorySummary();
  console.log(categorySummary);

  // filtering
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredCategorySummary, setFilteredCategorySummary] =
    useState(categorySummary);

  const filterCategoryByDate = () => {
    const filteredCategories = Object.keys(categorySummary).reduce(
      (acc, category) => {
        const categoryDate = new Date(categorySummary[category].date);
        const startDateObj = startDate ? new Date(startDate) : null;
        const endDateObj = endDate ? new Date(endDate) : null;

        if (
          (!startDateObj || categoryDate >= startDateObj) &&
          (!endDateObj || categoryDate <= endDateObj)
        ) {
          acc[category] = categorySummary[category];
        }

        return acc;
      },
      {}
    );

    setFilteredCategorySummary(filteredCategories);
  };

  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <View style={styles.piechart}>
          {expenses.length > 0 ? (
            <PieChart
              data={prepareChartData()}
              width={width}
              height={220}
              chartConfig={{
                backgroundColor: "#ffffff",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              accessor="value"
              backgroundColor="transparent"
              paddingLeft="15"
              hasLegend={true} // Enable legend to make the chart a doughnut chart
              center={[10, 10]} // Adjust the center to create a doughnut chart effect
              absolute // Render values as absolute numbers
            />
          ) : (
            <Text>No expenses data available</Text>
          )}
        </View>

        <ScrollView>
          <View style={styles.container}>
            <View style={styles.filterContainer}>
              <TextInput
                style={styles.dateInput}
                placeholder="Start Date (MM/DD/YYYY)"
                onChangeText={(text) => setStartDate(text)}
              />
              <TextInput
                style={styles.dateInput}
                placeholder="End Date (MM/DD/YYYY)"
                onChangeText={(text) => setEndDate(text)}
              />
              <TouchableOpacity
                style={styles.filterButton}
                onPress={filterCategoryByDate}
              >
                <Text style={styles.filterButtonText}>Filter</Text>
              </TouchableOpacity>
            </View>

            {Object.keys(filteredCategorySummary).map((category) => (
              <View key={category} style={styles.categoryItem}>
                <Text
                  style={{ color: filteredCategorySummary[category].color }}
                >
                  {category}
                </Text>
                <Text>{`$ ${filteredCategorySummary[category].value.toFixed(
                  2
                )}`}</Text>
                <Text>{`${filteredCategorySummary[category].percentage.toFixed(
                  2
                )}%`}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.summary}>
          <Text style={styles.header}>SUMMARY</Text>
          <ScrollView>
            <View>
              {Object.keys(categorySummary).map((category) => (
                <ListItem
                  key={category}
                  detail={<Text></Text>}
                  label={
                    <Text style={{ color: categorySummary[category].color }}>
                      {category}
                    </Text>
                  }
                  // Calculate percentage and value for each category
                  subtitle={`$ ${categorySummary[category].value.toFixed(2)}`}
                  percentage={`${categorySummary[category].percentage.toFixed(
                    2
                  )}% `}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  piechart: {
    height: 280,
  },
  header: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
    padding: 14,
  },
  summary: {
    borderRadius: 40,
    backgroundColor: theme.colors.card,
    paddingBottom: 20,
    borderWidth: 1,
    borderColor: "white",
    borderTopWidth: 1,
    borderTopColor: "white",
    borderLeftWidth: 1,
    borderLeftColor: "white",
    borderRightWidth: 1,
    borderRightColor: "white",
  },
  container: {
    padding: 10,
  },
  filterContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  dateInput: {
    flex: 1,
    color:'white',
    marginRight: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  filterButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
  },
  filterButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  categoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
});

export default ReportScreen;

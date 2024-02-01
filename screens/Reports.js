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
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const ReportScreen = () => {
  const [expenses, setExpenses] = useState([]);
  const [totalAmountSpent, setTotalAmountSpent] = useState(0);
  // Initialize state for selected month and year
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Function to handle month selection
  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
  };

  // Function to handle year selection
  const handleYearSelect = (year) => {
    setSelectedYear(year);
  };

  // Function to get month name from month number
  const getMonthName = (monthNumber) => {
    const months = [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ];
    return months[monthNumber - 1];
  };

  useEffect(() => {
    // Function to retrieve expenses data from local storage
    const fetchExpenses = async () => {
      try {
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

  // Calculate total amount spent whenever expenses change
  useEffect(() => {
    let total = 0;
    expenses.forEach(expense => {
      total += expense.amount;
    });
    setTotalAmountSpent(total);
  }, [expenses]);

  const [summaryExpanded, setSummaryExpanded] = useState(false);

  // Define your handle function to toggle summary view
  const toggleSummary = () => {
    setSummaryExpanded(!summaryExpanded);
  };

  return (
    <ScrollView>
    <View style={{ flex: 1 }}>
      <View style={styles.filterContainer}>
        <Text style={styles.header}>{`${getMonthName(
          selectedMonth
        )} ${selectedYear}`}</Text>
        <TouchableOpacity onPress={() => handleMonthSelect(selectedMonth + 1)}>
          <MaterialCommunityIcons
            name="calendar-search"
            size={34}
            color="white"
          />
        </TouchableOpacity>
      </View>

      {/* Render the pie chart */}
      {!summaryExpanded && (
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
              hasLegend={true} 
              center={[10, 10]}
              absolute 
            />
          ) : (
            <Text style={styles.header}>No expenses data available</Text>
          )}
        </View>
      )}
            <Text style={{ color:'white',textAlign:'center',paddingBottom:35,fontSize:20 }}>Total: ${totalAmountSpent}</Text>
      {/* Render the summary view */}
      <TouchableOpacity onPress={toggleSummary} >
        <View style={[styles.summary, summaryExpanded && styles.expandedSummary]}>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              paddingTop: 15,
            }}
          >
            <View style={styles.line}></View>
            <Text style={styles.header}>SUMMARY</Text>
          </View>

          <View style={styles.titleArrange}>
            <Text style={styles.title}>Category</Text>
            <Text style={styles.title}>Percentage</Text>
            <Text style={styles.title}>Amount</Text>
          </View>
          <ScrollView>
            <View>
              {Object.keys(categorySummary).map((category) => (
                <ListItem
                  key={category}
                  detail={<Text></Text>}
                  label={
                    <Text
                      style={{
                        color: categorySummary[category].color,
                        width: 120,
                      }}
                    >
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
      </TouchableOpacity>
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
  title: {
    color: "white",
    fontSize: 18,
  },
  titleArrange: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },

  summary: {
    borderRadius: 40,
    backgroundColor: theme.colors.card,
    paddingBottom: 80,
    borderWidth: 1,
    borderColor: "white",
    borderTopWidth: 1,
    borderTopColor: "white",
    borderLeftWidth: 1,
    borderLeftColor: "white",
    borderRightWidth: 1,
    borderRightColor: "white",
  },
  line: {
    height: 5,
    width: 60,
    backgroundColor: "#ccc",
    marginBottom: 5,
    borderRadius: 5,
  },
  container: {
    padding: 10,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default ReportScreen;

import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ListItem from "../components/ListItem";
import { theme } from "../theme";
import { Picker } from "@react-native-picker/picker";
import { AntDesign } from '@expo/vector-icons';
import { ExpensesContext } from "../context/ExpenseReportContext";



const { width } = Dimensions.get("window");


const ReportScreen = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2019 }, (_, i) => 2020 + i);
  const [totalAmountSpent, setTotalAmountSpent] = useState(0);
  const [categorySummary, setCategorySummary] = useState({});

  const { expenses } = useContext(ExpensesContext);


  // Function to handle month selection
  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
  };

  // Function to handle year selection
  const handleYearSelect = (year) => {
    setSelectedYear(year);
  };

  // Function to get month name from month number

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

  // Function to prepare data for the doughnut chart
  const prepareChartData = () => {
    const categoryData = {};

    // Filter expenses by selected month and year
    const filteredExpenses = expenses.filter((expense) => {
      // Split the date string and extract month, day, and year
      const [month, day, year] = expense.date.split("/").map(Number);
      return month === selectedMonth && year === selectedYear;
    });

    // Aggregate filtered expenses data by category and calculate total amount spent
    filteredExpenses.forEach((expense) => {
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
  const calculateCategorySummary = (filteredExpenses) => {
    const categorySummary = {};
    let totalExpense = 0;

    // Calculate total expenses and expenses per category
    filteredExpenses?.forEach((expense) => {
      const { category, amount } = expense;
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

  useEffect(() => {
    // Filter expenses by selected month and year
    const filteredExpenses = expenses.filter((expense) => {
      const [month, day, year] = expense.date.split("/").map(Number);
      return month === selectedMonth && year === selectedYear;
    });

    // Calculate category summary for the filtered expenses
    const newCategorySummary = calculateCategorySummary(filteredExpenses);

    // Update category summary state
    setCategorySummary(newCategorySummary);
  }, [expenses, selectedMonth, selectedYear]);

  const categorySummaryLength = Object.keys(categorySummary).length;

  useEffect(() => {
    // Filter expenses by selected month and year
    const filteredExpenses = expenses.filter((expense) => {
      const [month, day, year] = expense.date.split("/").map(Number);
      return month === selectedMonth && year === selectedYear;
    });

    // Calculate total amount spent for the filtered expenses
    let total = 0;
    filteredExpenses.forEach((expense) => {
      total += expense.amount;
    });

    // Update the total amount spent state
    setTotalAmountSpent(total);
  }, [expenses, selectedMonth, selectedYear]);

  const [summaryExpanded, setSummaryExpanded] = useState(false);

  // Define your handle function to toggle summary view
  const toggleSummary = () => {
    setSummaryExpanded(!summaryExpanded);
  };

  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <View style={styles.filterContainer}>
          {/* <View style={styles.datepicker}>
            <Text style={styles.titleDate}> {months[selectedMonth - 1]}</Text>
            <Text style={styles.titleDate}>{selectedYear}</Text>
          </View> */}

          <View style={styles.datepicker}>
            <View style={[styles.titleDate,{ flexDirection: "row", alignItems: "center" }]}>
              {/* <Text style={styles.title}>Month:</Text> */}
              
              <Picker
                selectedValue={selectedMonth}
                style={[styles.titleDate,{ height: 50, width: 180 }]}
                onValueChange={(itemValue) => handleMonthSelect(itemValue)}
                dropdownIconColor="white"
              >
                {months.map((month, index) => (
                  <Picker.Item  label={month} value={index + 1} key={month} />
                ))}
              </Picker>
              {/* <AntDesign name="caretdown" size={24} color="white" /> */}
            </View>

            <View style={[styles.titleDate,{ flexDirection: "row", alignItems: "center" }]}>
              {/* <Text style={styles.title}>Year:</Text> */}
              <Picker
                selectedValue={selectedYear}
                style={[styles.titleDate,{ height: 50, width: 150, color: "white" }]}
                onValueChange={(itemValue) => handleYearSelect(itemValue)}
                dropdownIconColor="white"
              >
                {years.map((year) => (
                  <Picker.Item
                  
                    label={year.toString()}
                    value={year}
                    key={year.toString()}
                  />
                ))}
              </Picker>
              {/* <AntDesign name="caretdown" size={24} color="white" /> */}
            </View>
          </View>
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
        <Text
          style={{
            color: "white",
            textAlign: "center",
            paddingBottom: 35,
            fontSize: 20,
          }}
        >
          Total: ${totalAmountSpent}
        </Text>
        {/* Render the summary view */}
        <TouchableOpacity onPress={toggleSummary}>
          {categorySummaryLength > 0 ? (
            <View
              style={[
                styles.summary,
                summaryExpanded && styles.expandedSummary,
              ]}
            >
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
                      subtitle={`$ ${categorySummary[category].value.toFixed(
                        2
                      )}`}
                      percentage={`${categorySummary[
                        category
                      ].percentage.toFixed(2)}% `}
                    />
                  ))}
                </View>
              </ScrollView>
            </View>
          ) : (
            <Text style={styles.header}>No expense data available</Text>
          )}
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
  titleDate:{
    color: "white",
    fontSize: 18,
    borderWidth: 1,
    borderColor: "white",
    borderTopWidth: 1,
    borderTopColor: "white",
    borderLeftWidth: 1,
    borderLeftColor: "white",
    borderRightWidth: 1,
    borderRightColor: "white",
    // paddingLeft:10,
    // paddingRight:10,
    paddingTop:2,
    paddingBottom:2,
    backgroundColor:theme.colors.card,
    borderRadius:10,
    // width: 150,
    textAlign:'center'


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
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
    // marginBottom: 10,
  },
  datepicker:{
     flexDirection: "row",
    justifyContent: "space-between",
    
    padding: 10,
  }
});

export default ReportScreen;

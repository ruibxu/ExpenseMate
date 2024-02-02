import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import {
  startOfWeek,
  format,
  isSameMonth,
  startOfMonth,
  isSameYear,
} from "date-fns";

const ExpenseGraph = ({ data }) => {
  const [period, setPeriod] = useState("month");
  const [isMonthPressed, setIsMonthPressed] = useState(false);
  const [isYearPressed, setIsYearPressed] = useState(false);

  const screenWidth = Dimensions.get("window").width;
  const currentYear = new Date().getFullYear(); // Obtener el año actual

  const chartConfig = {
    backgroundGradientFrom: "#020014",
    backgroundGradientTo: "#020014",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  const organizeData = (expenseData, period) => {
    console.log("Input data:", expenseData);
    console.log("Selected period:", period);

    let groupedData = {};

    expenseData.forEach((expense) => {
      let dateParts = expense.date.split('/');
      let date = new Date(`${dateParts[2]}-${dateParts[0]}-${dateParts[1]}`);
      let key;
  
      switch (period) {
        case "day":
          key = startOfWeek(date, { weekStartsOn: 1 }).toISOString();
          break;
        case "week":
          key = startOfWeek(date, { weekStartsOn: 1 }).toISOString();
          break;
        case "month":
          key = startOfWeek(date, { weekStartsOn: 1 }).toISOString();
          break;
        case "year":
          if (date.getFullYear() === currentYear) {
            key = startOfMonth(date).toISOString();
          }
          break;
        default:
          key = startOfWeek(date, { weekStartsOn: 1 }).toISOString();
      }
  
      if (key) {
        if (!groupedData[key]) {
          groupedData[key] = [];
        }
  
        groupedData[key].push(expense);
      }
  });

    let result;

    if (period === "month") {
      const allMonthData = Object.keys(groupedData)
        .map((key) => {
          return {
            date: new Date(key),
            expenses: groupedData[key],
          };
        })
        .sort((a, b) => a.date - b.date);

      const firstDayOfMonth = startOfMonth(new Date());
      const lastDayOfMonth = new Date(firstDayOfMonth);
      lastDayOfMonth.setMonth(firstDayOfMonth.getMonth() + 1);
      lastDayOfMonth.setDate(lastDayOfMonth.getDate() - 1);

      const weeksArray = [];
      let currentWeekStart = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 });

      while (currentWeekStart <= lastDayOfMonth) {
        weeksArray.push(new Date(currentWeekStart)); 
        currentWeekStart.setDate(currentWeekStart.getDate() + 7);
      }

      result = weeksArray.map((weekStart) => {
        const weekData = allMonthData.find(
          (dataPoint) => dataPoint.date.toISOString() === weekStart
        );

        return weekData || { date: new Date(weekStart), expenses: [] };
      });
    } else if (period === "year") {
      const currentYearData = Object.keys(groupedData)
        .map((key) => {
          return {
            date: new Date(key),
            expenses: groupedData[key],
          };
        })
        .filter((dataPoint) => isSameYear(dataPoint.date, new Date()))
        .reduce((acc, dataPoint) => {
          const monthIndex = dataPoint.date.getMonth();
          const existingData = acc[monthIndex];
  
          if (!existingData) {
            acc[monthIndex] = {
              date: dataPoint.date,
              expenses: dataPoint.expenses,
            };
          } else {
            existingData.expenses = existingData.expenses.concat(
              dataPoint.expenses
            );
          }
  
          return acc;
        }, [])
        .filter((dataPoint) => dataPoint !== undefined)
        .sort((a, b) => a.date - b.date);
  
      console.log("Data organized by year:", currentYearData);
  
      result = currentYearData;
    }

    console.log("Final result:", result);

    return result;
  };

  const handlePeriodPress = (newPeriod) => {
    setPeriod(newPeriod);
    setIsMonthPressed(newPeriod === "month");
    setIsYearPressed(newPeriod === "year");
  };

  const chartData = organizeData(data, period);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginBottom: 25,
        }}
      >
        <TouchableOpacity
          style={[styles.button, isMonthPressed && styles.buttonPressed]}
          activeOpacity={1}
          onPress={() => handlePeriodPress("month")}
        >
          <Text style={styles.textButton}>Month</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, isYearPressed && styles.buttonPressed]}
          activeOpacity={1}
          onPress={() => handlePeriodPress("year")}
        >
          <Text style={styles.textButton}>Year</Text>
        </TouchableOpacity>
      </View>
      <Text>feb</Text>
      <View style={styles.container}>
        <LineChart
          data={{
            labels: chartData.map((dataPoint, index) =>
              period === "month"
                ? `Week ${index + 1}`
                : period === "year"
                ? format(dataPoint.date, "MMM").slice(0, 3)
                : format(dataPoint.date, "MMM yy")
            ),
            datasets: [
              {
                data: chartData.map((dataPoint) =>
                  dataPoint.expenses.reduce(
                    (sum, expense) => sum + expense.amount,
                    0
                  )
                ),
              },
            ],
          }}
          width={screenWidth}
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1}
          chartConfig={chartConfig}
          bezier
        />
        <Text style={{ textAlign: "center", marginTop: 10 }}>
          Total: $
          {chartData.reduce(
            (total, dataPoint) =>
              total +
              dataPoint.expenses.reduce(
                (sum, expense) => sum + expense.amount,
                0
              ),
            0
          )}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2d2b3b",
    height: 38,
    width: 161,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "inset 0px 4px 4px 0px #00000040",
  },
  buttonPressed: {
    borderColor: "#ffffff",
    borderWidth: 2,
  },
  textButton: {
    color: "#FFFFFF",
    textTransform: "uppercase",
    fontSize: 20,
  },
  container: {
    overflow: "hidden",
  },
});

export default ExpenseGraph;

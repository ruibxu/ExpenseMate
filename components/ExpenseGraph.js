import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  format,
  isSameMonth,
} from "date-fns";

const ExpenseGraph = ({ data }) => {
  const [period, setPeriod] = useState("month");
  const [isMonthPressed, setIsMonthPressed] = useState(false);
  const [isYearPressed, setIsYearPressed] = useState(false);

  const screenWidth = Dimensions.get("window").width;
  const currentYear = new Date().getFullYear(); // Obtener el año actual

  const chartConfig = {
    backgroundGradientFrom: "#4da47d",
    backgroundGradientTo: "#4da47d",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  useEffect(() => {
    setPeriod("month");
  }, []);


  const organizeData = (expenseData, period) => {
    let groupedData = {};

    expenseData.forEach((expense) => {
      let date = new Date(expense.fecha);
      let key;

      switch (period) {
        case "day":
          key = startOfMonth(date).toISOString();
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
          key = startOfMonth(date).toISOString();
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
      const currentMonthData = Object.keys(groupedData)
        .map((key) => {
          return {
            date: new Date(key),
            expenses: groupedData[key],
          };
        })
        .filter((dataPoint) => isSameMonth(dataPoint.date, new Date()))
        .slice(0, 5);

      result = currentMonthData;
    } else if (period === "year") {
      result = Object.keys(groupedData)
        .map((key) => {
          return {
            date: new Date(key),
            expenses: groupedData[key],
          };
        })
        .sort((a, b) => a.date - b.date);
    }

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
          padding: 16,
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
      <View>
        <LineChart
          data={{
            labels: chartData.map((dataPoint) =>
              period === "month"
                ? `Week ${format(dataPoint.date, "w")}`
                : period === "year"
                ? format(dataPoint.date, "MMM")
                : format(dataPoint.date, "MMM yy")
            ),
            datasets: [
              {
                data: chartData.map((dataPoint) =>
                  dataPoint.expenses.reduce(
                    (sum, expense) => sum + expense.monto,
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
                (sum, expense) => sum + expense.monto,
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
    height: "38px",
    width: "161px",
    borderRadius: "10px",
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
    fontSize: "20px"
  },
});

export default ExpenseGraph;

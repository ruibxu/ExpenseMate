import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ListItem from "../components/ListItem";
import { theme } from "../theme";

const { width } = Dimensions.get("window");

const ReportScreen = () => {
  const [expenses, setExpenses] = useState([]);

  const labelRadius = 130;

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
    console.log(doughnutChartData);

    const renderLegends = () => {
      const angleStep = (2 * Math.PI) / doughnutChartDat.length;
      return doughnutChartDat.map((legend, index) => {
        const angle = index * angleStep;
        const x = labelRadius * Math.cos(angle);
        const y = labelRadius * Math.sin(angle);
        return (
          <View key={index} style={[styles.legendContainer, { left: width / 2 + x, top: width / 2 + y }]}>
            <Text style={[styles.legend, { color: legend.legendFontColor, fontSize: legend.legendFontSize }]}>
              {legend.name}
            </Text>
          </View>
        );
      });
    };

    return doughnutChartData;
  };

 

  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        {expenses.length > 0 ? (
          <PieChart
            data={prepareChartData()}
            width={330}
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

        <View>
          <View style={{ borderRadius: 20, overflow: "hidden" }}>
            {expenses.map((expense) => (
              <ListItem
                key={expense._id}
                detail={
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      marginRight: 10,
                      backgroundColor: expense.category
                        ? expense.category.color
                        : "gray", // Check if category is defined
                    }}
                  />
                }
                label={expense.category ? expense.category.label : "Unknown"}
                // labels={expense._id}
              />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ReportScreen;

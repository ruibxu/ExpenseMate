import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ReportScreen = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Function to retrieve expenses data from local storage
    const fetchExpenses = async () => {
      try {
        // Fetch expenses data from local storage (implement your own logic)
        const expensesData = await AsyncStorage.getItem('expenses');
        if (expensesData) {
          const parsedExpenses = JSON.parse(expensesData);
          setExpenses(parsedExpenses);
        }
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, []);

  // Function to generate random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Function to prepare data for the doughnut chart
  const prepareChartData = () => {
    const categoryData = {};

    // Aggregate expenses data by category and calculate total amount spent
    expenses.forEach((expense) => {
      const { category, amount } = expense;
      if (category && category.label) { // Check if category and label are defined
        if (categoryData[category.label]) {
          categoryData[category.label] += amount;
        } else {
          categoryData[category.label] = amount;
        }
      }
    });

    // Convert aggregated data to format suitable for pie chart
    const doughnutChartData = Object.keys(categoryData).map((label) => ({
      name: label,
      value: categoryData[label],
      color: getRandomColor(), // Generate random color for each category
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    }));

    return doughnutChartData;
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {expenses.length > 0 ? (
        <PieChart
          data={prepareChartData()}
          width={300}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
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
  );
};

export default ReportScreen;

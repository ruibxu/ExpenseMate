// ReportsScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Dimensions } from 'react-native';

const ReportsScreen = () => {
  const [filter, setFilter] = useState('monthly');

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const topExpenses = [
    { id: 1, icon: '💡', name: 'Utilities', amount: '$200' },
    { id: 2, icon: '🍔', name: 'Food', amount: '$150' },
    { id: 3, icon: '🚗', name: 'Transportation', amount: '$100' },
    // Add more expenses as needed
  ];

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={{ flex: 1 }}>
      {/* Top Half */}
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#4da47d', justifyContent: 'space-between',  padding: 16 }}>
        <Text style={{ color: 'white', fontSize: 20 }}>Expenditure Report</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* Dropdown for filter */}
          {/* <TouchableOpacity onPress={() => handleFilterChange('monthly')}>
            <Text style={{ color: 'white' }}>Monthly</Text>
          </TouchableOpacity> */}
          <View style={{ flexDirection: 'row', marginLeft: 10 }}>
            {/* Dots for Income and Expenses */}
            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'white', marginRight: 5 }}>
                <Text>Income</Text>
            </View>
            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'yellow' }}>
                <Text>Expense</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Graph */}
      <LineChart
        data={{
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sept'],
          datasets: [
            {
              data: [20, 45, 28, 80, 99, 43],
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White for income
            },
            {
              data: [50, 20, 55, 45, 77, 35],
              color: (opacity = 1) => `rgba(255, 255, 0, ${opacity})`, // Yellow for expenses
            },
          ],
        }}
        width={screenWidth}
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1}
        chartConfig={{
          backgroundGradientFrom: '#4da47d',
          backgroundGradientTo: '#4da47d',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
      />

      {/* Card View */}
      
      <View style={{ padding: 16,  }}>
        <Card style={{ marginVertical: 16 }}>
            <Card.Content>
            <Title>Current Month</Title>
            <Paragraph>Income: $500</Paragraph>
            {/* Add comparison information */}
            <Paragraph>Expense: $300</Paragraph>
            </Card.Content>
        </Card>
      </View>

      {/* Circle View */}

      <View style={{ padding: 16,  }}>
        <Card style={{ marginVertical: 16 }}>
            <Card.Content>
            <View style={{ alignItems: 'center', marginVertical: 16 }}>
                <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#4da47d', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                            {/* Display total expenditure */}
                            <Text style={{ color: 'black', fontSize: 16 }}>$1000</Text>
                        </View>
                </View>
             </View>
            <Title>Top Expenses</Title>
            <View style={{ marginTop: 16 }}>
                    {/* <Text style={{ color: 'white', fontSize: 20, marginBottom: 10 }}>Top Expenses</Text> */}
                    {topExpenses.map((expense) => (
                    <View key={expense.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                        <Text style={{ marginRight: 8 }}>{expense.icon}</Text>
                        <Text style={{ color: 'black', marginRight: 8 }}>{expense.name}</Text>
                        <Text style={{ color: 'black' }}>{expense.amount}</Text>
                    </View>
                ))}
            </View>
            </Card.Content>
        </Card>
      </View>
     
    </View>
  );
};

export default ReportsScreen;

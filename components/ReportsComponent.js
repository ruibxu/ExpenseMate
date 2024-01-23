// ReportsScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity , ScrollView} from 'react-native';
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
  ];

  const screenWidth = Dimensions.get('window').width;

  return (
    <ScrollView>
        <View style={styles.container}>
         {/* Top Half */}
         <View >
          <View style={styles.topHalf}>
            <View>
              <Text style={styles.halfText}>Expenditure Report</Text>
            </View>
             
            <View style={styles.topHalfFilter}>
              {/* Dropdown for filter */}
              <TouchableOpacity onPress={() => handleFilterChange('monthly')}>
                <Text style={styles.textColor}>Monthly</Text>
              </TouchableOpacity>


              {/* Dots for Income and Expenses */}
              <View style={styles.topHalfDotsContainer}>
                <View style={styles.dots}>
                  <View style={styles.dotsText}></View>
                  <Text style={styles.textColor}>Income</Text>
                </View>
              
                <View style={styles.dots}>
                  <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'yellow', marginRight: 5 }}></View>
                  <Text style={styles.textColor}>Expenses</Text>
                </View>
              </View>
            
              </View>
               
          </View>

          {/* Graph */}
          <View style={{ height:300, backgroundColor:'#4da47d' }}>

        
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
            <Card style={styles.currentMonthCard}>
              <Card.Content>
                <Title>Current Month</Title>
                <Paragraph>Income: $500</Paragraph>
                <Paragraph>Expense: $300</Paragraph>
              </Card.Content>
            </Card>
            </View>

          </View>

          {/* Circle View */}

          <View style={{ padding: 16, marginTop:20  }}>
            <Card style={{ marginVertical: 16, backgroundColor:'white' }}>
                <Card.Content>
                <View style={{ alignItems: 'center', marginVertical: 16 }}>
                    <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#4da47d', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                                {/* Display total expenditure */}
                                <Text style={{ color: 'black', fontSize: 16 }}>$1000</Text>
                            </View>
                    </View>
                </View>
                <Title>Top Spending</Title>
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
    </ScrollView>
    
  );
};

export default ReportsScreen;

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  topHalf:{
    flexDirection: 'column', 
    backgroundColor: '#4da47d',  
    padding: 16
  },
  halfText:{
    color: 'white', 
    fontSize: 20 , 
    paddingBottom: 15, 
    textAlign:'center', 
    fontWeight:'bold'
  },
  topHalfFilter:{
    flexDirection: 'row',  
    justifyContent:'space-between',
    paddingBottom:10 
  },
  topHalfDotsContainer:{
    flexDirection: 'row', 
    alignItems: 'center',
    gap:5
  },
  textColor:{
    color:'white'
  },
  currentMonthCard:{
    position: 'absolute', 
    bottom: -60, 
    left: 0, 
    right: 0, 
    margin: 16, 
    zIndex: 1, 
    backgroundColor:'white' 
  },
  dots:{
    flexDirection: 'row', 
    alignItems: 'center',
    gap:2 
  },
  dotsText:{
    width: 10, 
    height: 10, 
    borderRadius: 5, 
    backgroundColor: 'white', 
    marginRight: 5
  },
})

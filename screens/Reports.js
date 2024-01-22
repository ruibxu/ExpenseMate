// ReportsScreen.js
import React from 'react';
import ReportsComponent from '../components/ReportsComponent';

const ReportsScreen = () => {
  // Mock data for testing
  const reportData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    incomeData: [1000, 1200, 800, 1100, 900, 1300, 1000, 1500, 1200, 1000, 1100, 1300],
    expenseData: [800, 900, 700, 1000, 600, 1100, 900, 1200, 1000, 800, 900, 1100],
    currentMonthIncome: 1200,
    currentMonthExpense: 900,
    // Add more data as needed
  };

  return (
    <ReportsComponent data={reportData} />
  );
};

export default ReportsScreen;

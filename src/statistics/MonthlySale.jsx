import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BarChart from '../components/BarChart';

const MonthlySale = () => {
  const [chartData, setChartData] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [noData, setNoData] = useState(false); // State to handle the no-data scenario

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/transactions/');
        setTransactions(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTransactions();
  }, []);

  useEffect(() => {
    if (transactions.length === 0) return; // Wait until transactions are fetched

    // Calculate last month
    const currentDate = new Date();
    const lastMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1
    );
    const lastMonthYear = lastMonth.getFullYear();
    const lastMonthNumber = lastMonth.getMonth() + 1; // months are 0-indexed

    // Filter transactions for last month
    const lastMonthTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate.getFullYear() === lastMonthYear &&
        transactionDate.getMonth() + 1 === lastMonthNumber
      );
    });

    if (lastMonthTransactions.length === 0) {
      setNoData(true); // Set noData to true if there are no transactions for the last month
      return;
    }

    // Aggregate data by item name
    const aggregatedData = lastMonthTransactions.reduce((acc, curr) => {
      if (!acc[curr.name]) {
        acc[curr.name] = 0;
      }
      acc[curr.name] += curr.quantity;
      return acc;
    }, {});

    // Prepare data for Chart.js
    const labels = Object.keys(aggregatedData);
    const data = Object.values(aggregatedData);

    setChartData({
      labels,
      datasets: [
        {
          label: 'Quantity Sold',
          data,
          backgroundColor: '#467349',
          borderColor: '#333',
          borderWidth: 1,
        },
      ],
    });

    setNoData(false); // Reset noData if there is valid data for the chart
  }, [transactions]);

  return (
    <div id="MonthlyGraph" className="w-full BarChart">
      <h2>Sales Statistics for Last Month</h2>
      {noData ? (
        <p>No sales data available for last month.</p> // Display this message if there's no data
      ) : (
        <BarChart ChartData={chartData} /> // Display the chart if there is data
      )}
    </div>
  );
};

export default MonthlySale;

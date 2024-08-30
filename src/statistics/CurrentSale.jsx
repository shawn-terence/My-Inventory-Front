import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DefaultLayout from "../layouts/default";
import BarChart from "../components/BarChart";
import api from '../api'; // Ensure you have an 'api.js' file exporting the base URL

function CurrentSale() {
  const [chartData, setChartData] = useState({});
  const [transactions, setTransactions] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/transactions/`);
        if (Array.isArray(response.data)) {
          setTransactions(response.data); // Ensure response data is an array
        } else {
          console.error('Expected an array but got:', response.data);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    // Calculate the current month
    const currentDate = new Date();
    const currentMonthYear = currentDate.getFullYear();
    const currentMonthNumber = currentDate.getMonth() + 1; // months are 0-indexed

    // Filter transactions for the current month
    const currentMonthTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate.getFullYear() === currentMonthYear &&
        transactionDate.getMonth() + 1 === currentMonthNumber
      );
    });
    // Aggregate data by item name
    const aggregatedData = currentMonthTransactions.reduce((acc, curr) => {
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
          label: "Quantity Sold",
          data,
          backgroundColor: "#467349",
          borderColor: "#333",
          borderWidth: 1,
        },
      ],
    });
  }, [transactions]); // Re-run this effect whenever `transactions` change

  return (
    <div id='CurrentSale'>
      <h2>This Month's Sales Graph</h2>
      <BarChart ChartData={chartData} />
    </div>
  );
}

export default CurrentSale;

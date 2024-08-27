import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import api from '../api'
import BarChart from '../components/BarChart'
const MonthlySale = () => {
    const [chartData, setChartData] = useState({});
    const [transactions,setTransactions]=useState([])
    useEffect(()=>{
         const fetchTransactions = async () => {
            try {
              const response =await axios.get('http://127.0.0.1:8000/transactions/');
              setTransactions(response.data); 
            } catch (err) {
              console.error(err);
            }
          };
          fetchTransactions();
    },[])
    console.log(transactions)
    useEffect(() => {
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
            label: "Quantity Sold",
            data,
            backgroundColor: "#467349",
            borderColor: "#333",
            borderWidth: 1
          }
        ]
      });
    }, []);
  
    return (

        <div id="MonthlyGraph" className='w-full'>
          <h2>Sales Statistics for Last Month</h2>
          <BarChart ChartData={chartData} />
        </div>

    );
}

export default MonthlySale

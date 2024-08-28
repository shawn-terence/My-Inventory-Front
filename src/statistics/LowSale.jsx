import React from 'react'
import DefaultLayout from "../layouts/default";
import BarChart from "../components/BarChart";
import { useState, useEffect } from "react";
import axios from 'axios'
function LowSale() {
    const [chartData, setChartData] = useState({});
    const[transactions,setTransactions]=useState([])

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
      }, []); 
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
      //products that sold more than ten items
      const mostsold=(data)=>{
            const filtered_products={}
            for(const product in data){
                if(data[product]<=5){
                    filtered_products[product]=data[product]
            }
            }
            return filtered_products
      }
        const result=mostsold(aggregatedData)
      // Prepare data for Chart.js
      const labels = Object.keys(result);
      const data = Object.values(result);
  
      setChartData({
        labels,
        datasets: [
          {
            label: "Quantity Sold",
            data,
            backgroundColor: "rgba(237, 11, 37, 1)",
            borderColor: "#333",
            borderWidth: 1
          }
        ]
      });
    }, []);
  
    return (
        <div className='w-full'>
          <h2>Lowest selling Products last month</h2>
          <BarChart ChartData={chartData} />
        </div>

    );
}

export default LowSale

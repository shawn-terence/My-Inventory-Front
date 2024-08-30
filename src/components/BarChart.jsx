import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Spinner } from '@nextui-org/react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components for the chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ ChartData }) => {
  // Add a fallback check in case ChartData is not ready yet
  if (!ChartData || !ChartData.labels || !ChartData.datasets) {
    return <div><Spinner color='success' label="Loading..." size="lg" /></div>;
  }

  return (
    <div className='m-4 w-full p-2'>
      <Bar
        id='BarChart'
        className='Bar-Chart'
        data={ChartData}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;

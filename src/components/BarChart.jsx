import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Spinner } from '@nextui-org/react';
const BarChart = ({ ChartData }) => {
  // Add a fallback check
  if (!ChartData || !ChartData.labels || !ChartData.datasets) {
    return <div><Spinner color='sucess' label="Loading..." size="lg"/></div>;
  }

  return (
    <div className='m-4 w-full p-2'>

        <Bar
          id='BarChart'
            data={ChartData}
            options={{
              responsive: true,
              maintainAspectRatio: true, // Important to allow custom sizing
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
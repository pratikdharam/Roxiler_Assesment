import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="card h-80 animate-pulse">
        <h2 className="text-xl font-semibold mb-4">Price Range Distribution</h2>
        <div className="h-full bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Price Range Distribution</h2>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-center h-64 flex items-center justify-center">
          <p className="text-yellow-700">No data available for the selected month.</p>
        </div>
      </div>
    );
  }

  // Prepare data for Chart.js
  const chartData = {
    labels: data.map(item => item.priceRange),
    datasets: [
      {
        label: 'Number of Items',
        data: data.map(item => item.count),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Price Range Distribution',
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            return `Price Range: ${tooltipItems[0].label}`;
          },
          label: (context) => {
            return `Items: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Items',
        },
        ticks: {
          stepSize: 1,
        },
      },
      x: {
        title: {
          display: true,
          text: 'Price Range',
        },
      },
    },
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Price Range Distribution</h2>
      <div className="h-80">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
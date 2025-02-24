import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const PieChart = ({ data, isLoading }) => {
  // Generate random colors based on the category
  const generateColors = (count) => {
    const colors = [];
    const backgroundColors = [];
    
    for (let i = 0; i < count; i++) {
      // Use predefined colors for common categories
      const hue = (i * 137) % 360; // Golden ratio to spread colors
      const color = `hsl(${hue}, 70%, 60%)`;
      colors.push(color);
      backgroundColors.push(`hsl(${hue}, 70%, 85%)`);
    }
    
    return {
      borderColors: colors,
      backgroundColors: backgroundColors,
    };
  };

  if (isLoading) {
    return (
      <div className="card h-80 animate-pulse">
        <h2 className="text-xl font-semibold mb-4">Category Distribution</h2>
        <div className="h-full bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Category Distribution</h2>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-center h-64 flex items-center justify-center">
          <p className="text-yellow-700">No data available for the selected month.</p>
        </div>
      </div>
    );
  }

  // Get colors for the chart
  const { borderColors, backgroundColors } = generateColors(data.length);

  // Prepare data for Chart.js
  const chartData = {
    labels: data.map(item => item.category),
    datasets: [
      {
        label: 'Number of Items',
        data: data.map(item => item.count),
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 15,
          padding: 15,
        },
      },
      title: {
        display: true,
        text: 'Category Distribution',
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} items (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Category Distribution</h2>
      <div className="h-80">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
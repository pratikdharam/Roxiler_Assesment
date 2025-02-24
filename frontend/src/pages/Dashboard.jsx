import React, { useState, useEffect } from 'react';
import MonthSelector from '../components/MonthSelector';
import SearchBar from '../components/SearchBar';
import StatisticsCard from '../components/StatisticsCard';
import TransactionTable from '../components/TransactionTable';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import apiService from '../services/api';

const Dashboard = () => {
  // State
  const [selectedMonth, setSelectedMonth] = useState('march'); // Default to March
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  
  const [loading, setLoading] = useState({
    transactions: false,
    statistics: false,
    barChart: false,
    pieChart: false,
  });
  
  const [error, setError] = useState({
    transactions: null,
    statistics: null,
    barChart: null,
    pieChart: null,
  });

  // Fetch transactions
  const fetchTransactions = async () => {
    try {
      setLoading(prev => ({ ...prev, transactions: true }));
      setError(prev => ({ ...prev, transactions: null }));
      
      const response = await apiService.getTransactions(
        selectedMonth,
        searchTerm,
        currentPage,
        perPage
      );
      
      setTransactions(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError(prev => ({
        ...prev,
        transactions: err.response?.data?.message || 'Failed to fetch transactions',
      }));
    } finally {
      setLoading(prev => ({ ...prev, transactions: false }));
    }
  };

  // Fetch statistics
  const fetchStatistics = async () => {
    try {
      setLoading(prev => ({ ...prev, statistics: true }));
      setError(prev => ({ ...prev, statistics: null }));
      
      const response = await apiService.getStatistics(selectedMonth);
      setStatistics(response.data);
    } catch (err) {
      setError(prev => ({
        ...prev,
        statistics: err.response?.data?.message || 'Failed to fetch statistics',
      }));
    } finally {
      setLoading(prev => ({ ...prev, statistics: false }));
    }
  };

  // Fetch bar chart data
  const fetchBarChartData = async () => {
    try {
      setLoading(prev => ({ ...prev, barChart: true }));
      setError(prev => ({ ...prev, barChart: null }));
      
      const response = await apiService.getBarChartData(selectedMonth);
      setBarChartData(response.data);
    } catch (err) {
      setError(prev => ({
        ...prev,
        barChart: err.response?.data?.message || 'Failed to fetch bar chart data',
      }));
    } finally {
      setLoading(prev => ({ ...prev, barChart: false }));
    }
  };

  // Fetch pie chart data
  const fetchPieChartData = async () => {
    try {
      setLoading(prev => ({ ...prev, pieChart: true }));
      setError(prev => ({ ...prev, pieChart: null }));
      
      const response = await apiService.getPieChartData(selectedMonth);
      setPieChartData(response.data);
    } catch (err) {
      setError(prev => ({
        ...prev,
        pieChart: err.response?.data?.message || 'Failed to fetch pie chart data',
      }));
    } finally {
      setLoading(prev => ({ ...prev, pieChart: false }));
    }
  };

  // Alternative: Fetch all data at once using the combined endpoint
  const fetchCombinedData = async () => {
    try {
      // Set all loading states to true
      setLoading({
        transactions: true,
        statistics: true,
        barChart: true,
        pieChart: true,
      });
      
      // Clear all errors
      setError({
        transactions: null,
        statistics: null,
        barChart: null,
        pieChart: null,
      });
      
      const response = await apiService.getCombinedData(selectedMonth);
      
      // Update all states with the combined data
      setStatistics(response.data.statistics);
      setBarChartData(response.data.barChart);
      setPieChartData(response.data.pieChart);
      
      // Still need to fetch transactions separately due to search and pagination
      await fetchTransactions();
    } catch (err) {
      // Set error for all components
      const errorMessage = err.response?.data?.message || 'Failed to fetch data';
      setError({
        transactions: errorMessage,
        statistics: errorMessage,
        barChart: errorMessage,
        pieChart: errorMessage,
      });
    } finally {
      // Set all loading states to false
      setLoading({
        transactions: false,
        statistics: false,
        barChart: false,
        pieChart: false,
      });
    }
  };

  // Effects

  // Effect for month change - fetch all data
  useEffect(() => {
    // Reset pagination when month changes
    setCurrentPage(1);
    
    // Option 1: Fetch separately
    // fetchStatistics();
    // fetchBarChartData();
    // fetchPieChartData();
    
    // Option 2: Use combined endpoint
    fetchCombinedData();
    
    // Note: fetchTransactions is called inside fetchCombinedData
    // If not using combined, uncomment this:
    // fetchTransactions();
  }, [selectedMonth]);

  // Effect for search and pagination
  useEffect(() => {
    fetchTransactions();
  }, [searchTerm, currentPage, perPage]);

  // Handlers
  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Render
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="w-full md:w-1/3">
          <MonthSelector selectedMonth={selectedMonth} onChange={handleMonthChange} />
        </div>
        <div className="w-full md:w-2/3">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      <StatisticsCard 
        statistics={statistics} 
        isLoading={loading.statistics} 
      />

      <TransactionTable 
        transactions={transactions} 
        pagination={pagination}
        isLoading={loading.transactions} 
        onPageChange={handlePageChange}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart 
          data={barChartData} 
          isLoading={loading.barChart} 
        />
        
        <PieChart 
          data={pieChartData} 
          isLoading={loading.pieChart} 
        />
      </div>
    </div>
  );
};

export default Dashboard;
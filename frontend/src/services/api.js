import axios from 'axios';

// Default API configuration
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints
const apiService = {
  // Initialize database
  initializeDatabase: async () => {
    try {
      const response = await api.get('/initialize-db');
      return response.data;
    } catch (error) {
      console.error('API Error - Initialize Database:', error);
      throw error;
    }
  },

  // Get transactions with search and pagination
  getTransactions: async (month, search = '', page = 1, perPage = 10) => {
    try {
      const response = await api.get('/transactions', {
        params: { month, search, page, perPage },
      });
      return response.data;
    } catch (error) {
      console.error('API Error - Get Transactions:', error);
      throw error;
    }
  },

  // Get statistics
  getStatistics: async (month) => {
    try {
      const response = await api.get('/statistics', {
        params: { month },
      });
      return response.data;
    } catch (error) {
      console.error('API Error - Get Statistics:', error);
      throw error;
    }
  },

  // Get bar chart data
  getBarChartData: async (month) => {
    try {
      const response = await api.get('/bar-chart', {
        params: { month },
      });
      return response.data;
    } catch (error) {
      console.error('API Error - Get Bar Chart Data:', error);
      throw error;
    }
  },

  // Get pie chart data
  getPieChartData: async (month) => {
    try {
      const response = await api.get('/pie-chart', {
        params: { month },
      });
      return response.data;
    } catch (error) {
      console.error('API Error - Get Pie Chart Data:', error);
      throw error;
    }
  },

  // Get combined data
  getCombinedData: async (month) => {
    try {
      const response = await api.get('/combined', {
        params: { month },
      });
      return response.data;
    } catch (error) {
      console.error('API Error - Get Combined Data:', error);
      throw error;
    }
  },
};

export default apiService;
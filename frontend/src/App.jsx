import { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Loading from './components/Loading';
import axios from 'axios';

function App() {
  const [isInitializing, setIsInitializing] = useState(true);
  const [initializationError, setInitializationError] = useState(null);

  useEffect(() => {
    // Initialize the database when the app loads
    const initializeDatabase = async () => {
      try {
        setIsInitializing(true);
        const response = await axios.get('/api/initialize-db');
        console.log('Database initialization:', response.data);
      } catch (error) {
        console.error('Database initialization error:', error);
        setInitializationError(
          error.response?.data?.message || 'Failed to initialize database'
        );
      } finally {
        setIsInitializing(false);
      }
    };

    initializeDatabase();
  }, []);

  if (isInitializing) {
    return <Loading message="Initializing database..." />;
  }

  if (initializationError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <h2 className="text-2xl text-red-600 font-bold mb-4">Initialization Error</h2>
          <p className="text-gray-700 mb-4">{initializationError}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
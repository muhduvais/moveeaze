import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { TabProvider } from './contexts/TabContext';
import AppRoutes from './routes/Routes';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <TabProvider>
          <div className="min-h-screen bg-gray-900 text-white">
            <AppRoutes />
          </div>
        </TabProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import { TabProvider } from './contexts/TabContext';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <TabProvider>
          <div className="min-h-screen bg-gray-900 text-white">
            <Toaster position="top-right" />
            
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Protected routes */}
              <Route element={<ProtectedRoute />}>
                <Route
                  path="/"
                  element={
                    <>
                      <Navbar />
                      <div className="container mx-auto px-4 py-8">
                        <Search />
                      </div>
                    </>
                  }
                />
                <Route
                  path="/search"
                  element={
                    <>
                      <Navbar />
                      <div className="container mx-auto px-4 py-8">
                        <Search />
                      </div>
                    </>
                  }
                />
                <Route
                  path="/favorites"
                  element={
                    <>
                      <Navbar />
                      <div className="container mx-auto px-4 py-8">
                        <Favorites />
                      </div>
                    </>
                  }
                />
              </Route>
              
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </TabProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
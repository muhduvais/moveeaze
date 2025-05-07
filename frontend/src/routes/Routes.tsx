import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';

import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Search from '../pages/Search';
import Favorites from '../pages/Favorites';

import Navbar from '../components/Navbar';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes: React.FC = () => {
  return (
    <>
      <Toaster position="top-center" />
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

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginForm } from '../hooks/useLoginForm';
import Login_background from '../assets/Login_background.jpg'
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    errors,
    loading,
    isAuthenticated,
  } = useLoginForm();

  const navigate = useNavigate();

  const { error: mainError, clearError } = useAuth();

  useEffect(() => {
    clearError();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      clearError();
      navigate('/');
    }
  }, [isAuthenticated, navigate, clearError]);

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center" >

      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 filter blur-sm z-0"
        style={{ backgroundImage: `url(${Login_background})` }}
      />

      <div className="relative bg-gray-800 p-8 rounded-xl shadow-lg w-[98%] max-w-md mt-2 lg:mt-3">

        <div className="absolute -top-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
          <Link to="/" className="text-xl font-bold text-yellow-500">
            Move<span className='text-gray-300'>Eaze</span>
          </Link>

          <p className='text-sm text-gray-600'>Search and find your movies</p>
        </div>

        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-5 text-center">Login</h2>

        {mainError && (
          <div className="bg-red-800 text-white p-3 rounded-lg mb-4">
            {mainError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-2 lg:mb-4">
            <label className={`block text-sm lg:text-[16px] ${errors.email ? 'text-red-500' : 'text-gray-300'} mb-2`} htmlFor="email">
              {errors.email ? errors.email : `Email`}
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (mainError) clearError();
              }}
              className="w-full px-3 py-2 lg:px-4 lg:py-2 bg-gray-700 text-white rounded-md lg:rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="mb-5 lg:mb-7">
            <label className={`block text-sm lg:text-[16px] ${errors.password ? 'text-red-500' : 'text-gray-300'} mb-2`} htmlFor="password">
              {errors.password ? errors.password : `Password`}
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (mainError) clearError();
                }}
                className="w-full px-3 py-2 lg:px-4 lg:py-2 pr-10 bg-gray-700 text-white rounded-md lg:rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-yellow-500 text-black text-md lg:text-[16px] font-bold px-3 py-2 lg:px-4 lg:py-2 rounded-md lg:rounded-lg hover:bg-yellow-400 transition duration-300 cursor-pointer ${loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-5 lg:mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-yellow-500 hover:text-yellow-400">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
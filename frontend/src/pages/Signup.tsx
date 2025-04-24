import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Signup: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const { signup, error, loading, isAuthenticated, clearError } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // If user is already authenticated, redirect to home
        if (isAuthenticated) {
            navigate('/');
        }

        // Clear any errors when component mounts or unmounts
        clearError();
        return () => clearError();
    }, [isAuthenticated, navigate, clearError]);

    const validateForm = () => {
        if (password !== passwordConfirm) {
            setPasswordError('Passwords do not match');
            return false;
        }

        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            return false;
        }

        setPasswordError('');
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        await signup(name, email, password);
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Sign Up</h2>

                {error && (
                    <div className="bg-red-500 text-white p-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            required
                            minLength={6}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-300 mb-2" htmlFor="passwordConfirm">
                            Confirm Password
                        </label>
                        <input
                            id="passwordConfirm"
                            type="password"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            required
                        />
                        {passwordError && (
                            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg hover:bg-yellow-400 transition duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                    >
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-400">
                        Already have an account?{' '}
                        <Link to="/login" className="text-yellow-500 hover:text-yellow-400">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
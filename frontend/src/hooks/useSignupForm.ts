import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { validateSignup } from '../utils/validators/signup-validator';

const initialErrors = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
}

export const useSignupForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState(initialErrors)

    const { signup, error: mainError, loading, isAuthenticated, clearError } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            clearError();
            navigate('/');
        }
    }, [isAuthenticated, navigate, clearError]);

    const validateForm = () => {
        const signupErrors = validateSignup(name, email, password, confirmPassword);
        setErrors(signupErrors);
        return !Object.values(signupErrors).some(Boolean);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        await signup(name, email, password);
    };

    return {
        name, setName,
        email, setEmail,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        errors,
        mainError,
        loading,
        isAuthenticated,
        clearError,
        handleSubmit
    };
};
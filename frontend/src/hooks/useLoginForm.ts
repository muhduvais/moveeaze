import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { validateLogin } from '../utils/validators/login-validator';

const initialErrors = {
  email: '',
  password: '',
}

export const useLoginForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(initialErrors)
  const { login, error: mainError, loading, isAuthenticated, clearError } = useAuth();

  const validateForm = () => {
    const signupErrors = validateLogin(email, password);
    setErrors(signupErrors);
    return !Object.values(signupErrors).some(Boolean);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    await login(email, password);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    errors,
    mainError,
    loading,
    isAuthenticated,
    clearError,
  };
};

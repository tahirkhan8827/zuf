import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import Notification from '../../Notification/Notification';
import ConfirmationModal from '../../ConfirmationModal/ConfirmationModal';
import { FiCheckCircle } from 'react-icons/fi';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setShowSuccessModal(true);
      
    } catch (error) {
      console.error('Login error:', error);
      showNotification(error.message || 'Login failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmSuccess = () => {
    setShowSuccessModal(false);
    navigate('/');
  };
  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <div className="login-container">
        <div className="login-form-container">
          <h1 className="login-title">Login</h1>
          <p className="login-subtitle">Please enter your e-mail and password:</p>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="form-options">
              <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
            </div>

            <button 
              type="submit" 
              className="login-button"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'LOG IN'}
            </button>
          </form>

          <div className="signup-link">
            Don't have an account? <Link to={'/register'}>Create one</Link>
          </div>
        </div>
      </div>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
  <ConfirmationModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}  /* Use the defined function here */
        onConfirm={handleConfirmSuccess}
        title="Login Successful!"
        message="Welcome back! You have successfully logged in."
        confirmText="Continue to Dashboard"
        icon={FiCheckCircle}
        type="success"
      />
      
    </>
  );
};

export default Login;
import React, { useContext, useState, useEffect } from 'react';
import '../../App.css';
import { AuthContext } from '../../context/AuthContext.js';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function Login() {
  const { activeUsername, setActiveUsername, setActiveUserId } = useContext(AuthContext);
  const [currentUsername, setCurrentUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate= useNavigate();

  useEffect(() => {
    if(activeUsername!== null)
    {
      console.log('active user:', activeUsername);
      navigate('/dashboard')
    }
    
  }, [activeUsername]);

  const fetchUserDetails = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:3001/auth/login', {
        username: currentUsername,
        password: password
      });
      const { username, userId, message } = response.data;
      if (username) {
        setActiveUsername(username);
        setActiveUserId(userId);
      } else {
        console.log('message:', message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    if (currentUsername === '' || password === '') {
      alert('Please fill in the username and password.');
    } else {
      fetchUserDetails();
    }
  };

  return (
    <div className='background-login-register'>
      <div className='welcome-statement'>
        Welcome to <div className='quizzhub-title'>QuizzHub</div>
      </div>
      <div className='login-form'>
        <div className='login-header'>Login</div>
        <input
          type='text'
          className='text-box-plain'
          placeholder='Username'
          onChange={(e) => {
            setCurrentUsername(e.target.value);
          }}
        />
        <input
          type='password'
          className='text-box-plain'
          placeholder='Password'
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className='login-button' onClick={handleLogin} disabled={isLoading}>
          {isLoading ? 'Logging In...' : 'Login'}
        </button>
        <div className='login-footer-statement'>
          Don't have an account? <a href='/register'>Register</a>
        </div>
      </div>
    </div>
  );
}

export default Login;

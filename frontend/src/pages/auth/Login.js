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
  const [register, setRegister]= useState(false);

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
      const {status, username, userId, message } = response.data;
      if (status===1) {
        setActiveUsername(username);
        setActiveUserId(userId);
      } else if(status===0) {
        alert(message);
      }
      else if(status===2){
        setRegister(true);
        alert(message);
      }
      else{
        console.log('response: ', response);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const createNewUser= async()=>{
    try{
      setIsLoading(true);
      const response= await axios.post('http://localhost:3001/auth/register',{
        username: currentUsername,
        password: password
      });
      const {status, username, userId, message } = response.data;
      if (status===1) {
        setActiveUsername(username);
        setActiveUserId(userId);
      } else if(status===0) {
        alert(message);
      }
      else{
        console.log('response: ', response);
      }

    }
    catch(err){
      console.log(err);
    }
  }

  const handleLogin = () => {
    if (currentUsername === '' || password === '') {
      alert('Please fill in the username and password.');
    } else if(!register) {
      fetchUserDetails();
    }
    else{
      createNewUser();
    }
  };

  return (
    <div className='background-login-register'>
      <div className='welcome-statement'>
        Welcome to <div className='quizzhub-title'>QuizzHub</div>
      </div>
      <div className='login-form'>
        <div className='login-header'>{register? `Register` : `Login`}</div>
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
          {register ? isLoading ? 'Creating user...': 'Register': isLoading ? 'Logging In...' : 'Login'}
        </button>
        
          {register
          ?(<div className='login-footer-statement'>Already have an account? <u className='register' onClick={()=>{setRegister(false)}}>Login</u> </div>) 
          :(<div className='login-footer-statement'>Don't have an account? <u className='register' onClick={()=>{setRegister(true)}}>Register</u> </div>)
          
          }
          
       
      </div>
    </div>
  );
}

export default Login;
